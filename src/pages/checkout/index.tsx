import { useFormik } from "formik";
import Container from "../../components/shared/container";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { useSearchParams } from "react-router-dom";
import { Button, Input, Spin } from "antd";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import FormInput from "../../components/form/form-input";
import { useEffect } from "react";
import Label from "../../components/shared/label";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { useCreatePaymentIntentMutation } from "../../redux/features/payment/paymentApi";
import FormikErrorBox from "../../components/shared/formik-error-box";
import { toast } from "sonner";

export default function Checkout() {
  const [searchParams] = useSearchParams();

  const product_id = searchParams.get("product");
  const quantity = searchParams.get("quantity");

  const { data: productsData, isLoading: productLoading } =
    useGetSingleProductQuery(product_id as string, { skip: !product_id });

  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery(
    {},
  );
  const user = profileData?.data;
  const product = productsData?.data;

  const [createOrder, { isLoading: createOrderLoading }] =
    useCreateOrderMutation();

  const [createPaymentIntent, { isLoading: createPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      customer: "",
      phone: "",
      product: product_id,
      quantity: Number(quantity),
      delivery_address: "",
    },

    onSubmit: async (values) => {
      const payload = {
        customer: values.customer,
        product: values.product,
        quantity: values.quantity,
        delivery_address: values.delivery_address,
        phone: values.phone.startsWith("+88")
          ? values.phone
          : `+88${values.phone}`,
      };

      try {
        const orderResponse = await createOrder(payload).unwrap();
        const order_id = orderResponse?.data?._id;
        const paymentIntentResponse =
          await createPaymentIntent(order_id).unwrap();
        const paymentUrl = paymentIntentResponse?.data?.paymentURL;
        window.location.href = paymentUrl;
      } catch (error) {
        console.log(error);
        // @ts-expect-error error type
        toast.error(error?.data?.message || "Failed to place order");
      }
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        ...formik.values,
        name: user?.name,
        email: user?.email,
        customer: user?._id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Container>
      <Spin spinning={productLoading || profileLoading}>
        <h2 className="text-center text-4xl font-bold text-[#18181b]">
          Checkout
        </h2>

        <div className="mt-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-start justify-between lg:flex-row lg:gap-5">
              <div className="w-full space-y-5">
                <FormInput label="Name" name="name" formik={formik} disabled />
                <FormInput
                  label="Email"
                  name="email"
                  formik={formik}
                  disabled
                />
                <FormInput
                  label="Phone"
                  name="phone"
                  formik={formik}
                  required
                />

                <div className="space-y-1">
                  <Label htmlFor="delivery_address" className={"py-1"} required>
                    Delivery Address
                  </Label>
                  <Input.TextArea
                    placeholder="Enter your delivery address"
                    {...formik.getFieldProps("delivery_address")}
                    style={{
                      height: 150,
                      resize: "none",
                    }}
                  />
                  <FormikErrorBox name="delivery_address" formik={formik} />
                </div>
              </div>

              <div className="w-full rounded-lg border border-gray-300 bg-white lg:w-8/12">
                <div className="flex flex-col justify-between p-8">
                  <p className="text-center text-3xl font-semibold text-[#18181b] underline underline-offset-8">
                    Order Summary
                  </p>

                  <div className="mt-10">
                    <div className="flex items-center gap-4 pb-4">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="size-24 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="line-clamp-1 text-2xl font-semibold">
                          {product?.name}
                        </p>
                        <p className="mb-3 text-sm font-medium">
                          Price: ৳{product?.price}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex w-fit items-center rounded-md border border-gray-300">
                            <button
                              type="button"
                              onClick={() =>
                                formik.setFieldValue(
                                  "quantity",
                                  formik.values.quantity - 1,
                                )
                              }
                              className="cursor-pointer rounded-l-md border-r border-gray-300 px-2 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={
                                formik.values.quantity <= 1 ||
                                product?.quantity === 0
                              }
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={
                                formik.values.quantity > product?.quantity
                                  ? product?.quantity
                                  : formik.values.quantity
                              }
                              onChange={(e) =>
                                e.target.value > product?.quantity
                                  ? formik.setFieldValue(
                                      "quantity",
                                      product?.quantity,
                                    )
                                  : formik.setFieldValue(
                                      "quantity",
                                      Math.max(
                                        1,
                                        parseInt(e.target.value) || 1,
                                      ),
                                    )
                              }
                              className="w-6 bg-transparent text-center text-xs outline-none disabled:cursor-not-allowed"
                              disabled={product?.quantity === 0}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                formik.setFieldValue(
                                  "quantity",
                                  formik.values.quantity + 1,
                                )
                              }
                              className="cursor-pointer rounded-r-md border-l border-gray-300 px-2 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={
                                formik.values.quantity >= product?.quantity
                              }
                            >
                              +
                            </button>
                          </div>

                          <p className="text-lg font-medium">
                            Total: ৳
                            {(product?.price * formik.values.quantity).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-lg font-medium">Subtotal:</p>
                      <p className="text-lg font-medium">
                        ৳{(product?.price * formik.values.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="my-2 flex items-center justify-between">
                      <p className="text-lg font-medium">Shipping Charge:</p>
                      <p className="text-lg font-medium">৳{(70).toFixed(2)}</p>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="mt-2 mb-3 flex items-center justify-between">
                      <p className="text-2xl font-medium">Grand Total:</p>
                      <p className="text-2xl font-medium">
                        ৳
                        {(product?.price * formik.values.quantity + 70).toFixed(
                          2,
                        )}
                      </p>
                    </div>

                    <Button
                      htmlType="submit"
                      className={`!hover:bg-[#a48d70] w-full !rounded-lg !bg-[#b89579] !text-white`}
                      loading={createOrderLoading || createPaymentIntentLoading}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Spin>
    </Container>
  );
}

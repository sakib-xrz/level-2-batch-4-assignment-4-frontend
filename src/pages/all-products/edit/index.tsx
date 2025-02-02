import * as Yup from "yup";
import { Breadcrumb, Button, Select, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../../../components/shared/title";
import { useFormik } from "formik";
import FormInput from "../../../components/form/form-input";
import Label from "../../../components/shared/label";
import {
  productBrandsOptions,
  productCategoriesOptions,
} from "../../../utils/constant.tsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormikErrorBox from "../../../components/shared/formik-error-box";
import {
  useEditProductMutation,
  useGetSingleProductQuery,
} from "../../../redux/features/product/productApi";
import { toast } from "sonner";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const nvaigate = useNavigate();

  const { data, isLoading } = useGetSingleProductQuery(id as string, {
    skip: !id,
  });

  const items = [
    {
      title: <Link to="/all-products">Product</Link>,
    },
    {
      title: "Edit Product",
    },
  ];

  const [editProduct, { isLoading: isEditProductLoading }] =
    useEditProductMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      product_model: "",
      image: "",
      brand: null,
      category: null,
      price: null,
      quantity: null,
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      product_model: Yup.string().required("Model is required"),
      image: Yup.string().url("Invalid URL").required("Image is required"),
      brand: Yup.string().required("Brand is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number().required("Price is required"),
      quantity: Yup.number().required("Quantity is required"),
    }),
    onSubmit: async (values) => {
      try {
        await editProduct({ id, body: values }).unwrap();
        formik.resetForm();
        toast.success("Product edited successfully");
        nvaigate("/all-products");
      } catch (error) {
        console.error(error);
        toast.error(
          // @ts-expect-error error type is unknown
          error?.data?.error && error.data.error.length > 0
            ? // @ts-expect-error error type is unknown
              error.data.error[0]?.message
            : // @ts-expect-error error type is unknown
              error.data.message || "Failed to edit product",
        );
      }
    },
  });

  const product = data?.data;

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        product_model: product.product_model,
        image: product.image,
        brand: product.brand,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <div className="space-y-5">
      <div>
        <Breadcrumb items={items} />
      </div>

      <Spin spinning={isLoading}>
        <div className="space-y-3 sm:rounded-md sm:bg-white sm:p-6 sm:shadow lg:p-8">
          <Title title={"Edit Product"} />

          <form onSubmit={formik.handleSubmit} className="space-y-2">
            <FormInput
              label="Name"
              name="name"
              placeholder="Enter bicycle name"
              formik={formik}
              required
            />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
              <FormInput
                label="Model"
                name="product_model"
                placeholder="Enter bicycle model"
                formik={formik}
                required
              />
              <FormInput
                label="Image"
                name="image"
                placeholder="Enter image URL"
                formik={formik}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="category" className={"py-1"} required>
                  Category
                </Label>
                <Select
                  className="!mt-0.5 !w-full"
                  options={productCategoriesOptions}
                  placeholder="Select bicycle category"
                  onChange={(value) => {
                    {
                      formik.setFieldValue("category", value);
                    }
                  }}
                  value={formik.values.category}
                />
                <FormikErrorBox formik={formik} name="category" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="brand" className={"py-1"} required>
                  Brand
                </Label>
                <Select
                  className="!mt-0.5 !w-full"
                  options={productBrandsOptions}
                  placeholder="Select bicycle brand"
                  onChange={(value) => {
                    {
                      formik.setFieldValue("brand", value);
                    }
                  }}
                  value={formik.values.brand}
                />
                <FormikErrorBox formik={formik} name="brand" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
              <FormInput
                label="Price"
                name="price"
                type="number"
                placeholder="Enter bicycle price"
                formik={formik}
                required
              />
              <FormInput
                label="Stock Quantity"
                name="quantity"
                type="number"
                placeholder="Enter bicycle stock quantity"
                formik={formik}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className={"py-1"}>
                Description
              </Label>

              <ReactQuill
                placeholder="Enter detail description about the bicycle"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { indent: "-1" },
                      { indent: "+1" },
                    ],
                    ["link"],
                    ["clean"],
                  ],
                }}
                theme="snow"
                value={formik.values.description}
                onChange={(value: unknown) =>
                  formik.setFieldValue("description", value)
                }
              />
            </div>

            <div>
              <div className="mt-5 flex items-center gap-2">
                <Link to="/all-products" className="w-full">
                  <Button className="w-full" disabled={isEditProductLoading}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={isEditProductLoading}
                >
                  Edit Product
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Spin>
    </div>
  );
}

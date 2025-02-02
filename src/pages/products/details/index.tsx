import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../redux/features/product/productApi";
import { Image } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import Container from "../../../components/shared/container";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import RealtedProducts from "./realted-products";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyUser";
import { toast } from "sonner";

export default function ProductDetails() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useGetSingleProductQuery(id as string, {
    skip: !id,
  });

  const product = data?.data;

  let role = null;

  if (token) {
    const user = verifyToken(token as string);
    // @ts-expect-error: user object might not have role
    role = user.role;
  }

  return (
    <Container>
      <Link
        to="/products"
        className="mb-4 flex items-center gap-1 text-gray-600"
      >
        <ArrowLeft />
        Back to Products Page
      </Link>
      {isLoading ? (
        <div className="flex animate-pulse flex-col items-center gap-5 md:flex-row md:items-start md:gap-6 lg:gap-10">
          <div className="w-full md:w-6/12 lg:w-5/12">
            <div className="aspect-square rounded-2xl bg-gray-200"></div>
          </div>
          <div className="w-full space-y-4 md:w-6/12 lg:w-7/12">
            <div>
              <div className="h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="mt-2 h-9 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="h-12 w-1/2 rounded bg-gray-200"></div>

            <hr className="my-4 border-gray-300" />

            <div className="space-y-2 text-gray-600">
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>

            <div>
              <div className="mt-2 h-4 w-1/3 rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-full rounded bg-gray-200"></div>
              <div className="mt-2 h-4 w-2/3 rounded bg-gray-200"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
              <div className="h-4 w-1/4 rounded bg-gray-200"></div>
            </div>

            <div className="flex w-fit items-center rounded-md border border-gray-300">
              <div className="h-10 w-10 cursor-pointer rounded-l-md border-r border-gray-300 bg-gray-200 px-4 py-[0.560rem] text-lg"></div>
              <div className="h-10 w-10 cursor-pointer bg-gray-200 px-4 py-[0.560rem] text-lg"></div>
              <div className="h-10 w-10 cursor-pointer rounded-r-md border-l border-gray-300 bg-gray-200 px-4 py-[0.560rem] text-lg"></div>
            </div>

            <div className="mt-2 h-10 w-60 rounded bg-gray-200"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-6 lg:gap-10">
            {/* Product Image */}
            <div className="w-full md:w-6/12 lg:w-5/12">
              <Image
                src={product?.image}
                alt={product?.name}
                className="aspect-square w-full rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="w-full space-y-4 md:w-6/12 lg:w-7/12">
              <div>
                <div className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
                  {product?.brand}
                </div>
                <h1 className="text-4xl font-semibold text-gray-900">
                  {product?.name}
                </h1>
              </div>
              <h2 className="text-5xl font-bold text-[#b89579]">
                TK. {product?.price}
              </h2>

              <hr className="my-4 border-gray-300" />

              <div className="space-y-1 text-gray-600">
                <p>
                  <span className="font-semibold">Model:</span>{" "}
                  <span className="text-gray-800 uppercase">
                    {product?.product_model}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  <span className="text-gray-800 uppercase">
                    {product?.category}
                  </span>
                </p>
              </div>

              {/* Product Description */}
              <div>
                <p className="text-md font-semibold text-gray-700">
                  Product Description:
                </p>
                <p
                  className="prose mt-1 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <p className="text-md font-semibold text-gray-700">
                  Available Stock:
                </p>
                <p
                  className={`font-bold ${
                    product?.in_stock ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {product?.in_stock
                    ? `In Stock (${product?.quantity})`
                    : "Out of Stock"}
                </p>
              </div>

              {/* Add Quantity Increase or Decrease Button */}

              <div className="flex w-fit items-center rounded-md border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="cursor-pointer rounded-l-md border-r border-gray-300 px-4 py-[0.560rem] text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={quantity <= 1 || product?.quantity === 0}
                >
                  −
                </button>
                <input
                  type="number"
                  value={
                    quantity > product?.quantity ? product?.quantity : quantity
                  }
                  onChange={(e) =>
                    e.target.value > product?.quantity
                      ? setQuantity(product?.quantity)
                      : setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="text-smfont-medium size-10 bg-transparent text-center outline-none disabled:cursor-not-allowed"
                  disabled={product?.quantity === 0}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="cursor-pointer rounded-r-md border-l border-gray-300 px-4 py-[0.560rem] text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={quantity >= product?.quantity}
                >
                  +
                </button>
              </div>

              {/* Action Button */}
              <button
                className={`flex items-center justify-center gap-2 rounded-lg px-8 py-2 font-semibold shadow-md transition max-sm:w-full sm:py-3 ${
                  product?.in_stock
                    ? "cursor-pointer bg-[#b89579] text-white hover:bg-[#a48d70] hover:shadow-lg"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
                disabled={!product?.in_stock}
                onClick={(e) => {
                  e.stopPropagation();

                  if (!token) {
                    toast.message("Please login to buy products", {
                      description: "You need to login to buy products",
                      action: {
                        label: "Login",
                        onClick: () => {
                          navigate(
                            `/login?next=/checkout?product=${product._id}&quantity=${quantity}`,
                          );
                        },
                      },
                    });
                    return;
                  }

                  if (role === "ADMIN") {
                    toast.message("Admins can't buy products", {
                      description: "Please login as a customer to buy products",
                    });
                  } else {
                    navigate(
                      `/checkout?product=${product._id}&quantity=${quantity}`,
                    );
                  }
                }}
              >
                <ShoppingOutlined className="text-lg" />
                Buy Now
              </button>
            </div>
          </div>

          <RealtedProducts
            brand={product?.brand}
            currentProductId={product?._id}
          />
        </>
      )}
    </Container>
  );
}

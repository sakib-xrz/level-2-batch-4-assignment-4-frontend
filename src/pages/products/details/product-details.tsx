import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../redux/features/product/productApi";
import { Spin } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import Container from "../../../components/shared/container";
import "react-quill/dist/quill.snow.css";

export default function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductQuery(id as string, {
    skip: !id,
  });

  const product = data?.data;

  console.log(product);

  return (
    <Container>
      <Spin spinning={isLoading}>
        <div className="flex justify-center gap-10">
          {/* Product Image */}
          <div className="w-full md:w-4/12">
            <img
              src={product?.image}
              alt={product?.name}
              className="aspect-square w-full rounded-xl object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-8/12">
            <div className="text-sm font-medium text-gray-500 uppercase">
              {product?.brand}
            </div>
            <h1 className="text-3xl font-medium text-gray-900">
              {product?.name}
            </h1>
            <h1 className="mt-3 text-5xl font-bold text-[#b89579]">
              TK. {product?.price}
            </h1>
            <div>
              <hr className="my-3 h-[0.25px] border border-gray-300" />
            </div>
            <p className="mb-2 text-gray-500">
              Model:{" "}
              <span className="text-gray-700 uppercase">
                {product?.product_model}
              </span>
            </p>
            <p className="mb-2 text-gray-500">
              Category:{" "}
              <span className="text-gray-700 uppercase">
                {product?.category}
              </span>
            </p>
            <div>
              <p className="text-md text-gray-600">Product Description:</p>
              <p
                className="prose !p-0"
                style={{ color: "#364153" }}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            </div>

            <div className="mt-2">
              <p className="text-md text-gray-600">Avabilable Stock:</p>
              <p
                className={`font-semibold ${
                  product?.in_stock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product?.in_stock
                  ? `In Stock (${product?.quantity})`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Action Buttons */}
            <button
              className={`flex items-center justify-center gap-2 rounded-lg px-8 py-1 font-semibold transition max-sm:w-full sm:py-2 ${product?.in_stock ? "cursor-pointer bg-[#b89579] text-white hover:bg-[#a48d70]" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}
              disabled={!product?.in_stock}
              onClick={(e) => {
                e.stopPropagation();
                alert("Buy Now Clicked");
              }}
            >
              <ShoppingOutlined />
              Buy Now
            </button>
          </div>
        </div>
      </Spin>
    </Container>
  );
}

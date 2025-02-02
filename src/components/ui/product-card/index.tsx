import React from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyUser";
import { toast } from "sonner";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    product_model: string;
    image: string;
    category: string;
    description: string;
    quantity: number;
    in_stock: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const token = useAppSelector(useCurrentToken);

  let role = null;

  if (token) {
    const user = verifyToken(token as string);
    // @ts-expect-error: user object might not have role
    role = user.role;
  }

  return (
    <div
      className="flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2 shadow-md sm:p-4"
      onClick={() => navigate(`/products/${product?._id}`)}
    >
      {/* Product Image */}
      <div className="relative rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square rounded-lg object-cover"
        />

        {/* Stock Status Badge */}
        <span className={`absolute top-1 right-1`}>
          {product.in_stock ? (
            <Tag color="green" className="!text-xs">
              In Stock
            </Tag>
          ) : (
            <Tag color="red" className="!text-xs">
              Out of Stock
            </Tag>
          )}
        </span>
      </div>

      {/* Product Info */}
      <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
        {product.name}
      </h3>
      <p className="line-clamp-1 text-xs font-medium text-gray-500">
        {product.brand} | {product.category}
      </p>
      <p className="text-xl font-bold text-[#b89579] lg:text-2xl">
        ৳{product.price}
      </p>

      {/* CTA Button */}
      <button
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-1 font-semibold transition sm:py-2 ${product.in_stock ? "cursor-pointer bg-[#b89579] text-white hover:bg-[#a48d70]" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}
        disabled={!product.in_stock}
        onClick={(e) => {
          e.stopPropagation();
          if (!token) {
            toast.message("Please login to buy products", {
              description: "You need to login to buy products",
              action: {
                label: "Login",
                onClick: () => {
                  navigate(
                    `/login?next=/checkout?product=${product._id}&quantity=1`,
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
            navigate(`/checkout?product=${product._id}&quantity=1`);
          }
        }}
      >
        <ShoppingOutlined />
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;

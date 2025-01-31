import React from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { Tag } from "antd";

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
  return (
    <div className="flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-300 bg-white p-2 shadow-md sm:p-4">
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
        ${product.price}
      </p>

      {/* CTA Button */}
      <button
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-1 font-semibold transition sm:py-2 ${product.in_stock ? "bg-[#b89579] text-white hover:bg-[#a48d70]" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}
        disabled={!product.in_stock}
      >
        <ShoppingOutlined />
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { Card, Button, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

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
    <Card
      hoverable
      className="border border-gray-200 shadow-md transition-all hover:shadow-lg"
      cover={
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
      }
    >
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-600">
        {product.brand} | {product.category}
      </p>
      <p className="text-xl font-bold text-[#c2ab8e]">${product.price}</p>

      <div className="mt-4 flex items-center justify-between">
        <Tooltip title={product.in_stock ? "In Stock" : "Out of Stock"}>
          <span
            className={`text-sm font-medium ${product.in_stock ? "text-green-600" : "text-red-600"}`}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </span>
        </Tooltip>

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          className="border-none !bg-[#c2ab8e] text-black hover:!bg-[#a48d70]"
          disabled={!product.in_stock}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;

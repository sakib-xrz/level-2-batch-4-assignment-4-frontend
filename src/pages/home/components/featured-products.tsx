import React from "react";
import ProductCard from "../../../components/ui/product-card";

const products = [
  {
    _id: "6794bf5f5800ad9d402d84af",
    name: "Road Bike 15",
    brand: "EcoWheel",
    price: 759,
    product_model: "RO-679",
    image:
      "https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg",
    category: "Road",
    description: "An aerodynamic road bike perfect for competitive cycling.",
    quantity: 46,
    in_stock: true,
  },
  {
    _id: "6794bf5f5800ad9d402d84b0",
    name: "Mountain Bike X",
    brand: "SpeedX",
    price: 999,
    product_model: "MTB-900",
    image:
      "https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg",
    category: "Mountain",
    description: "A sturdy mountain bike built for rough terrains.",
    quantity: 10,
    in_stock: true,
  },
  {
    _id: "6794bf5f5800ad9d402d84b1",
    name: "Electric Commuter",
    brand: "VoltRide",
    price: 1299,
    product_model: "ECO-500",
    image:
      "https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg",
    category: "Electric",
    description: "A modern electric bike designed for city commuting.",
    quantity: 5,
    in_stock: true,
  },
  {
    _id: "6794bf5f5800ad9d402d84b2",
    name: "Hybrid Explorer",
    brand: "CityGear",
    price: 849,
    product_model: "HY-700",
    image:
      "https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg",
    category: "Hybrid",
    description: "A versatile hybrid bike for both city and off-road rides.",
    quantity: 0,
    in_stock: false,
  },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="bg-white py-20 text-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-[#18181b]">Featured Bikes</h2>
          <p className="mt-2 text-gray-600">
            Discover the latest premium bicycles designed for performance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

import React from "react";
import ProductCard from "../../../components/ui/product-card";
import Container from "../../../components/shared/container";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { Bicycle } from "../../../types/bicycle.types";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const FeaturedProducts: React.FC = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 4,
    in_stock: true,
  });

  const products = productsData?.data || [];
  return (
    <section className="bg-white text-gray-900">
      <Container>
        {/* Section Title */}
        <div className="mb-12 text-center" id="featured-products">
          <h2 className="text-4xl font-bold text-[#18181b]">
            Featured Bicycles
          </h2>
          <p className="mt-2 text-gray-600">
            Discover the latest premium bicycles designed for performance.
          </p>
        </div>

        {/* Product Grid */}
        <Spin spinning={isLoading}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products?.map((product: Bicycle) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>

          {/* View More Button */}
          <Link to={"/products"} className="mt-8 flex justify-center">
            <button
              className={`flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#b89579] px-20 py-1 font-semibold text-white transition hover:bg-[#a48d70] sm:py-2`}
            >
              View More
            </button>
          </Link>
        </Spin>
      </Container>
    </section>
  );
};

export default FeaturedProducts;

import { Spin } from "antd";
import { Bicycle } from "../../../types/bicycle.types";
import ProductCard from "../../../components/ui/product-card";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";

export default function RealtedProducts({
  brand,
  currentProductId,
}: {
  brand: string;
  currentProductId: string;
}) {
  const { data: productsData, isLoading } = useGetProductsQuery(
    {
      page: 1,
      limit: 4,
      brand,
      in_stock: true,
    },
    { skip: !brand },
  );

  const products =
    productsData?.data.filter(
      (product: Bicycle) => product?._id !== currentProductId,
    ) || [];
  return (
    <Spin spinning={isLoading}>
      {products?.length > 0 && (
        <>
          <h2 className="mt-10 mb-5 text-2xl font-bold text-gray-900">
            Related Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products?.map((product: Bicycle) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </>
      )}
    </Spin>
  );
}

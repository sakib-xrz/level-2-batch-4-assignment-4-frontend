import { useEffect, useState } from "react";
import Container from "../../components/shared/container";
import Filter from "./components/filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateQueryString, sanitizeParams } from "../../utils/constant";
import { useDebouncedCallback } from "use-debounce";
import Label from "../../components/shared/label";
import { Button, Drawer, Empty, Pagination, Select } from "antd";
import { omit } from "lodash";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductCard from "../../components/ui/product-card";
import ProductCardSkeleton from "../../components/ui/skeleton/product-card-skeleton";
import { ListFilter } from "lucide-react";

interface ProductProps {
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
}

export default function Products() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [params, setParams] = useState({
    minPrice: Number(searchParams.get("minPrice")) || null,
    maxPrice: Number(searchParams.get("maxPrice")) || null,
    in_stock: searchParams.get("in_stock") || null,
    brand: searchParams.get("brand") || null,
    category: searchParams.get("category") || null,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
  });

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    navigate(`/products${queryString}`, { replace: true });
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const modifyParams = () => {
    if (params.minPrice !== null && params.maxPrice !== null) {
      const modifiedParams = omit(
        {
          ...params,
          priceRange: `${params.minPrice}-${params.maxPrice}`,
        },
        ["minPrice", "maxPrice"],
      );
      return modifiedParams;
    } else {
      return omit(params, ["minPrice", "maxPrice"]);
    }
  };

  const { data: productsData, isLoading } = useGetProductsQuery(
    sanitizeParams(modifyParams()),
  );

  const products = productsData?.data || [];

  const handlePaginationChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <Container>
      <div className="flex gap-5">
        <div className="sticky top-20 hidden h-screen w-52 lg:block">
          <Filter params={params} setParams={setParams} />
        </div>

        <div className="w-full flex-1">
          <div className="flex items-center justify-between lg:justify-end">
            <div className="max-sm:hidden lg:hidden">
              <Button size="small" onClick={() => setShowFilterDrawer(true)}>
                <ListFilter />
                Filter
              </Button>
            </div>
            <div className="sm:hidden">
              <Button size="small" onClick={() => setShowFilterDrawer(true)}>
                <ListFilter />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Label>Sort By</Label>
              <Select
                size="small"
                value={
                  params.sortBy === "createdAt" && params.sortOrder === "desc"
                    ? "createdAt"
                    : params.sortBy === "price" && params.sortOrder === "asc"
                      ? "price"
                      : "-price"
                }
                style={{ width: "170px" }}
                options={[
                  {
                    label: "Default",
                    value: "createdAt",
                  },
                  {
                    label: "Price Low to High",
                    value: "price",
                  },
                  {
                    label: "Price High to Low",
                    value: "-price",
                  },
                ]}
                onChange={(value) => {
                  if (value === "createdAt") {
                    setParams((params) => ({
                      ...params,
                      sortBy: "createdAt",
                      sortOrder: "desc",
                    }));
                  } else if (value === "price") {
                    setParams((params) => ({
                      ...params,
                      sortBy: "price",
                      sortOrder: "asc",
                    }));
                  } else if (value === "-price") {
                    setParams((params) => ({
                      ...params,
                      sortBy: "price",
                      sortOrder: "desc",
                    }));
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-5">
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {[...Array(12)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <Empty />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {products.map((product: ProductProps) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <div className="mt-5">
                  <Pagination
                    current={params.page}
                    onChange={handlePaginationChange}
                    total={productsData.meta.total}
                    pageSize={params.limit}
                    align="center"
                    showSizeChanger={true}
                    onShowSizeChange={(current, size) =>
                      setParams((prev) => ({
                        ...prev,
                        limit: size,
                        page: current,
                      }))
                    }
                    responsive={true}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Drawer
        title={<div className="py-5">Filter</div>}
        placement="left"
        closable={true}
        onClose={() => setShowFilterDrawer(false)}
        open={showFilterDrawer}
      >
        <div className="p-6">
          <Filter params={params} setParams={setParams} />
        </div>
      </Drawer>
    </Container>
  );
}

import { Button, Input, Select } from "antd";
import Label from "../../../components/shared/label";
import { useState } from "react";
import useDesktop from "../../../hooks/use-desktop";
import { SlidersHorizontal, X } from "lucide-react";
import { BicycleApiResponse } from "../../../types/bicycle.types";
import {
  productBrandsOptions,
  productCategoriesOptions,
} from "../../../utils/constant";

type TParams = {
  search: string;
  product_model: string;
  brand: string | null;
  category: string | null;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
};

interface ProductSearchFilterProps {
  params: TParams;
  setParams: (params: TParams) => void;
  searchKey: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: BicycleApiResponse;
}

export default function ProductSearchFilter({
  params,
  setParams,
  searchKey,
  handleSearchChange,
  data,
}: ProductSearchFilterProps) {
  const isDesktop = useDesktop();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative flex items-end gap-2">
        <div className="w-full space-y-2">
          <Label htmlFor="search">Search product</Label>
          <Input
            name="search"
            type="search"
            placeholder="Search by bicycle name, brand, or category"
            onChange={handleSearchChange}
            value={searchKey}
            allowClear
          />
        </div>
        <div>
          <Button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            icon={
              isFilterVisible ? (
                <X className="text-primary size-5" />
              ) : (
                <SlidersHorizontal className="text-primary size-5" />
              )
            }
          >
            {isDesktop && (isFilterVisible ? "Close" : "Filter")}
          </Button>

          {isFilterVisible && (
            <div className="absolute top-20 left-0 z-10 w-full space-y-3 rounded border border-gray-300 bg-white p-4 shadow">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="category">Filter by category</Label>
                  <Select
                    value={params.category}
                    onChange={(value) => {
                      setParams({ ...params, category: value });
                      setIsFilterVisible(false);
                    }}
                    options={productCategoriesOptions}
                    placeholder="Filter by category"
                    optionFilterProp="label"
                    allowClear
                    showSearch
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="brand">Filter by brand</Label>
                  <Select
                    value={params.brand}
                    onChange={(value) => {
                      setParams({ ...params, brand: value });
                      setIsFilterVisible(false);
                    }}
                    options={productBrandsOptions}
                    placeholder="Filter by brand"
                    optionFilterProp="label"
                    allowClear
                    showSearch
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Showing{" "}
        {data?.data?.length > 0
          ? `${params.limit * (params.page - 1) + 1} to ${
              params.limit * params.page > data?.meta?.total
                ? data?.meta?.total
                : params.limit * params.page
            } of ${data?.meta?.total} entries`
          : "No data found"}
      </p>
    </div>
  );
}

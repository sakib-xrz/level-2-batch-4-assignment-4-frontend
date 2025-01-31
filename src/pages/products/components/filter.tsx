// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { InputNumber, Radio, Spin } from "antd";
import {
  productBrandsOptions,
  productCategoriesOptions,
} from "../../../utils/constant";
import { useGetPriceRangeQuery } from "../../../redux/features/product/productApi";
import { useEffect } from "react";

type TParams = {
  minPrice: number | null;
  maxPrice: number | null;
  in_stock: string | null;
  brand: string | null;
  category: string | null;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
};

interface FilterProps {
  params: TParams;
  setParams: (params: TParams) => void;
}

export default function Filter({ params, setParams }: FilterProps) {
  const { data, isLoading } = useGetPriceRangeQuery({});

  useEffect(() => {
    if (data) {
      setParams((params) => ({
        ...params,
        minPrice: data?.data?.minPrice as number,
        maxPrice: data?.data?.maxPrice as number,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <p className="text-xl uppercase">Filter By</p>
      <div className="h-0.5 w-[75px] bg-[#b89579]"></div>
      <div>
        <div className="mt-5"></div>
        <p className="font-bahnschrift text-lg text-[#5b5b5b]">Price Range</p>
        <hr className="border border-gray-200" />
        <div className="-mt-[2px] h-0.5 w-[50px] bg-[#b89579]"></div>

        <div className="!my-4 flex items-center justify-between gap-2">
          <InputNumber
            style={{ width: "50%" }}
            placeholder="Min"
            value={params.minPrice}
            type="number"
            onChange={(value) => {
              setParams((params) => ({
                ...params,
                minPrice: Number(value),
                page: 1,
              }));
            }}
            size="small"
          />
          <InputNumber
            style={{ width: "50%" }}
            placeholder="Max"
            value={params.maxPrice}
            type="number"
            onChange={(value) => {
              setParams((params) => ({
                ...params,
                maxPrice: Number(value),
                page: 1,
              }));
            }}
            size="small"
          />
        </div>
      </div>
      <div>
        <div className="mt-5"></div>
        <p className="font-bahnschrift text-lg text-[#5b5b5b]">Availability</p>
        <hr className="border border-gray-200" />
        <div className="-mt-[2px] h-0.5 w-[50px] bg-[#b89579]"></div>

        <div className="my-4">
          <Radio.Group
            options={[
              { label: "All", value: null },
              { label: "In Stock", value: "true" },
              { label: "Out of Stock", value: "false" },
            ]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            value={params.in_stock}
            onChange={(e: RadioChangeEvent) => {
              setParams((params) => ({
                ...params,
                in_stock: e.target.value,
                page: 1,
              }));
            }}
          />
        </div>
      </div>
      <div>
        <div className="mt-5"></div>
        <p className="font-bahnschrift text-lg text-[#5b5b5b]">Category</p>
        <hr className="border border-gray-200" />
        <div className="-mt-[2px] h-0.5 w-[50px] bg-[#b89579]"></div>

        <div className="my-4">
          <Radio.Group
            options={[
              { label: "All", value: null },
              ...productCategoriesOptions,
            ]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            value={params.category}
            onChange={(e: RadioChangeEvent) => {
              setParams((params) => ({
                ...params,
                category: e.target.value,
                page: 1,
              }));
            }}
          />
        </div>
      </div>
      <div>
        <div className="mt-5"></div>
        <p className="font-bahnschrift text-lg text-[#5b5b5b]">Brand</p>
        <hr className="border border-gray-200" />
        <div className="-mt-[2px] h-0.5 w-[50px] bg-[#b89579]"></div>

        <div className="my-4">
          <Radio.Group
            options={[{ label: "All", value: null }, ...productBrandsOptions]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
            value={params.brand}
            onChange={(e: RadioChangeEvent) => {
              setParams((params) => ({
                ...params,
                brand: e.target.value,
                page: 1,
              }));
            }}
          />
        </div>
      </div>
    </Spin>
  );
}

import { Button, Input, Select } from "antd";
import Label from "../../../components/shared/label";
import { useState } from "react";
import useDesktop from "../../../hooks/use-desktop";
import { SlidersHorizontal, X } from "lucide-react";
import { OrderApiResponse } from "../../../types/order.types.ts";
import {
  orderStatusOptions,
  paymentStatusOptions,
} from "../../../utils/constant.tsx";

type TParams = {
  search: string;
  status: string | null;
  payment_status: string | null;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
};

interface OrderSearchFilterProps {
  params: TParams;
  setParams: (params: TParams) => void;
  searchKey: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: OrderApiResponse;
}

export default function OrderSearchFilter({
  params,
  setParams,
  searchKey,
  handleSearchChange,
  data,
}: OrderSearchFilterProps) {
  const isDesktop = useDesktop();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative flex items-end gap-2">
        <div className="w-full space-y-2">
          <Label htmlFor="search">Search order</Label>
          <Input
            name="search"
            type="search"
            placeholder="Search by transaction ID or customer phone number"
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
                <X className="text-primary size-4" />
              ) : (
                <SlidersHorizontal className="text-primary size-4" />
              )
            }
          >
            {isDesktop && (isFilterVisible ? "Close" : "Filter")}
          </Button>

          {isFilterVisible && (
            <div className="absolute top-20 left-0 z-10 w-full space-y-3 rounded border border-gray-300 bg-white p-4 shadow">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="status">Filter by status</Label>
                  <Select
                    value={params.status}
                    onChange={(value) => {
                      setParams({ ...params, status: value });
                      setIsFilterVisible(false);
                    }}
                    options={orderStatusOptions}
                    placeholder="Filter by status"
                    optionFilterProp="label"
                    allowClear
                    showSearch
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="payment_status">
                    Filter by payment status
                  </Label>
                  <Select
                    value={params.payment_status}
                    onChange={(value) => {
                      setParams({ ...params, payment_status: value });
                      setIsFilterVisible(false);
                    }}
                    options={paymentStatusOptions}
                    placeholder="Filter by payment status"
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

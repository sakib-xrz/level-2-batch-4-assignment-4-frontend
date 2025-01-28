import { Input } from "antd";
import Label from "../../../components/shared/label.tsx";
import { CustomersApiResponse } from "../../../types/customer.types.ts";

type TParams = {
  search: string;
  page: number;
  limit: number;
};

interface UserSearchFilterProps {
  params: TParams;
  searchKey: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: CustomersApiResponse;
}

export default function UserSearchFilter({
  params,
  searchKey,
  handleSearchChange,
  data,
}: UserSearchFilterProps) {
  return (
    <div className="space-y-3">
      <div className="relative flex items-end gap-2">
        <div className="w-full space-y-2">
          <Label htmlFor="search">Search user</Label>
          <Input
            name="search"
            type="search"
            placeholder="Search user by name or email"
            onChange={handleSearchChange}
            value={searchKey}
            allowClear
          />
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

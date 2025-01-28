import { Pagination, Table } from "antd";
import TitleWithButton from "../../components/shared/title-with-button";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "../../utils/constant";
import OrderSearchFilter from "./components/order-search-filter";

export default function Orders() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || null,
    payment_status: searchParams.get("payment_status") || null,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    navigate(`/orders${queryString}`, { replace: true });
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchKey(value);
    debouncedSearch(value);
  };

  const handlePaginationChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const { data, isLoading } = useGetAllOrdersQuery(sanitizeParams(params));

  const dataSource = data?.data || [];

  const columns = [];

  // @ts-expect-error: data might be undefined
  const handleTableChange = (_pagination, _filters, sorter) => {
    const { order, columnKey } = sorter;

    setParams((prev) => ({
      ...prev,
      sortBy: columnKey || "created_at",
      sortOrder:
        order === "ascend" ? "asc" : order === "descend" ? "desc" : "desc",
    }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <TitleWithButton title="Orders" />
      </div>
      <OrderSearchFilter
        params={params}
        setParams={setParams}
        searchKey={searchKey}
        handleSearchChange={handleSearchChange}
        data={data}
      />

      {/* <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{
          x: "max-content",
        }}
        rowKey={(record) => record.id}
        onChange={handleTableChange}
      /> */}

      {!isLoading && (
        <Pagination
          current={params.page}
          onChange={handlePaginationChange}
          total={data.meta.total}
          pageSize={params.limit}
          align="center"
          showSizeChanger={true}
          onShowSizeChange={(current, size) =>
            setParams((prev) => ({ ...prev, limit: size, page: current }))
          }
          responsive={true}
        />
      )}
    </div>
  );
}

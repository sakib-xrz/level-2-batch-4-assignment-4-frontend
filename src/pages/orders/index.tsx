import { Image, Pagination, Table, Tag } from "antd";
import TitleWithButton from "../../components/shared/title-with-button";
import { useGetAllOrdersQuery } from "../../redux/features/order/orderApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "../../utils/constant.tsx";
import OrderSearchFilter from "./components/order-search-filter";
import { Order } from "../../types/order.types.ts";
import dayjs from "dayjs";

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

  const columns = [
    {
      title: "Order",
      dataIndex: "transaction_id",
      key: "transaction_id",
      render: (_text: string, record: Order) => (
        <div>
          <p className="font-mono">{record.transaction_id}</p>
          <p className="text-sm text-gray-500">
            {dayjs(record.createdAt).format("MMM DD, hh:mm A")}
          </p>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_text: string, record: Order) => (
        <div className="flex items-center gap-3">
          <Image
            width={50}
            height={50}
            src={record.product.image}
            alt={record.product.name}
          />
          <div>
            <p>{record.product.name} </p>
            <p className="text-sm text-gray-500">
              {record.product.product_model}{" "}
              <span className="font-bold text-green-600">
                (x{record.quantity})
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_text: string, record: Order) => (
        <div>
          <p>{record.customer.name}</p>
          <p className="text-sm text-gray-500">{record.phone}</p>
        </div>
      ),
    },
    {
      title: "Shipping Address",
      dataIndex: "delivery_address",
      key: "delivery_address",
      render: (_text: string, record: Order) => (
        <p className="line-clamp-2 max-w-64 text-sm">
          {record.delivery_address}
        </p>
      ),
      width: 250,
    },
    {
      title: <div className="text-center">Payment Status</div>,
      dataIndex: "payment_status",
      key: "payment_status",
      render: (_text: string, record: Order) => (
        <div className="text-center">
          <Tag
            color={
              record.payment_status === "PAID"
                ? "green"
                : record.payment_status === "PENDING"
                  ? "gray"
                  : record.payment_status === "FAILED"
                    ? "red"
                    : "orange"
            }
          >
            {record.payment_status}
          </Tag>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: <div className="text-center">Total Price</div>,
      dataIndex: "grand_total",
      key: "grand_total",
      render: (_text: string, record: Order) => (
        <div className="text-center">
          <p className="font-bold text-green-600">{record.grand_total} Tk.</p>
        </div>
      ),
    },
  ];

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

      <Table
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
      />

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

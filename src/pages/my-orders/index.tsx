import { Button, Image, Pagination, Table, Tag } from "antd";
import TitleWithButton from "../../components/shared/title-with-button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateQueryString, sanitizeParams } from "../../utils/constant";
import { useDebouncedCallback } from "use-debounce";
import { useGetMyOrdersQuery } from "../../redux/features/order/orderApi";
import { Order } from "../../types/order.types.ts";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useCreatePaymentIntentMutation } from "../../redux/features/payment/paymentApi.ts";

export default function MyOrders() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [params, setParams] = useState({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const [id, setId] = useState<string | null>(null);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    navigate(`/my-orders${queryString}`, { replace: true });
  };

  const debouncedUpdateURL = useDebouncedCallback(updateURL, 500);

  useEffect(() => {
    debouncedUpdateURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const { data, isLoading } = useGetMyOrdersQuery(sanitizeParams(params));

  const [createPaymentIntent, { isLoading: createPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();

  const dataSource = data?.data || [];

  const columns = [
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
            className="aspect-square object-cover"
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
      title: <div className="text-center">Total Price</div>,
      dataIndex: "grand_total",
      key: "grand_total",
      render: (_text: string, record: Order) => (
        <div className="text-center">
          <p className="font-bold text-green-600">{record.grand_total} Tk.</p>
        </div>
      ),
    },
    {
      title: <div className="text-center">Order Status</div>,
      dataIndex: "status",
      key: "status",
      render: (_text: string, record: Order) => (
        <div className="text-center">
          <Tag
            color={
              record.status === "PENDING"
                ? "gray"
                : record.status === "PROCESSING"
                  ? "orange"
                  : record.status === "SHIPPED"
                    ? "blue"
                    : record.status === "DELIVERED"
                      ? "green"
                      : "red"
            }
          >
            {record.status}
          </Tag>
        </div>
      ),
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
      title: <div className="text-center">Payment</div>,
      key: "payment",
      render: (_text: string, record: Order) => (
        <div className="flex items-center justify-center">
          <Button
            size="small"
            type="text"
            disabled={record.payment_status === "PAID"}
            loading={createPaymentIntentLoading && record._id === id}
            onClick={async () => {
              setId(record._id);
              try {
                const { data } = await createPaymentIntent(record._id);
                window.location.href = data?.data?.paymentURL;
              } catch (error) {
                console.log(error);
                toast.error("Failed to create payment intent");
              } finally {
                setId(null);
              }
            }}
          >
            Pay Now
          </Button>
        </div>
      ),
    },
  ];

  const handlePaginationChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <TitleWithButton title="My Orders" />
      </div>

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

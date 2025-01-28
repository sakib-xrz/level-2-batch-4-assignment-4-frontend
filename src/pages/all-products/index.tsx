import { useEffect, useState } from "react";
import TitleWithButton from "../../components/shared/title-with-button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { generateQueryString, sanitizeParams } from "../../utils/constant";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import ProductSearchFilter from "./components/product-search-filter";
import { Button, Image, Modal, Pagination, Table, Tag } from "antd";
import { Bicycle } from "../../types/bicycle.types";
import { toast } from "sonner";

export default function AllProducts() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    product_model: searchParams.get("product_model") || "",
    brand: searchParams.get("brand") || null,
    category: searchParams.get("category") || null,
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: searchParams.get("sortOrder") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  const [id, setId] = useState<string | null>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    navigate(`/all-products${queryString}`, { replace: true });
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

  const { data, isLoading } = useGetProductsQuery(sanitizeParams(params));

  const dataSource = data?.data || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Bicycle) => (
        <div className="flex items-center gap-3">
          <Image width={50} height={50} src={record.image} alt={record.name} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Product Model",
      dataIndex: "product_model",
      key: "product_model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (_text: string, record: Bicycle) => (
        <div className="text-center">{record.price || 0}</div>
      ),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: true,
      render: (_text: string, record: Bicycle) => (
        <div className="text-center">{record.quantity || 0}</div>
      ),
    },
    {
      title: "In Stock",
      dataIndex: "in_stock",
      key: "in_stock",
      sorter: true,
      render: (_text: string, record: Bicycle) => (
        <div className="text-center">
          {record.in_stock ? (
            <Tag color="green">IN STOCK</Tag>
          ) : (
            <Tag color="red">OUT OF STOCK</Tag>
          )}
        </div>
      ),
    },
    {
      title: <div className="text-center">Actions</div>,
      key: "action",
      render: (_text: string, record: Bicycle) => (
        <div className="flex items-center justify-center space-x-4">
          <Link
            to={`/all-products/edit/${record._id}`}
            className="cursor-pointer !text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <p
            className="cursor-pointer text-red-500 hover:underline"
            onClick={() => {
              setId(record._id);
              setOpenDeleteModal(true);
            }}
          >
            Delete
          </p>
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

  const handleDelete = async () => {
    try {
      await deleteProduct(id as string).unwrap();
      setOpenDeleteModal(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      // @ts-expect-error: error might be undefined
      toast.error(error.message || "Failed to delete Product");
    } finally {
      setId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <TitleWithButton
          title="Products"
          buttonText="Add Product"
          href="/all-products/add"
        />
      </div>
      <ProductSearchFilter
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

      <Modal
        open={openDeleteModal}
        title="Do you really want to delete this product?"
        closable={false}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              disabled={isDeleteLoading}
              onClick={() => {
                setOpenDeleteModal(false);
                setId(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              loading={isDeleteLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        }
        centered
        destroyOnClose
      >
        <p>This will permanently delete the product form our database.</p>
      </Modal>
    </div>
  );
}

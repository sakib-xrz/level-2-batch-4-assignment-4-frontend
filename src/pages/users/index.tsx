import { useEffect, useState } from "react";
import { useGetCustomersQuery } from "../../redux/features/user/userApi";
import { generateQueryString, sanitizeParams } from "../../utils/constant";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, Table } from "antd";
import TitleWithButton from "../../components/shared/title-with-button";
import UserSearchFilter from "./components/user-search-filter";
import { Customer } from "../../types/customer.types";
import dayjs from "dayjs";

export default function Users() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchKey, setSearchKey] = useState(searchParams.get("search") || "");

  const [params, setParams] = useState({
    search: searchParams.get("search") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  });

  // const [id, setId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedCallback((value) => {
    setParams((prev) => ({ ...prev, search: value, page: 1 }));
  }, 400);

  const updateURL = () => {
    const queryString = generateQueryString(params);
    navigate(`/users${queryString}`, { replace: true });
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

  const { data, isLoading } = useGetCustomersQuery(sanitizeParams(params));

  const dataSource = data?.data || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Customer) => (
        <a href={`/users/${record._id}`}>{text}</a>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_text: string, record: Customer) => (
        <p>{dayjs(record.createdAt).format("MMM DD YYYY, hh:mm A")}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "is_blocked",
      key: "is_blocked",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <TitleWithButton title="Users" />
      </div>
      <UserSearchFilter
        params={params}
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

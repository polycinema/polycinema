import React from "react";

import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

import {
  useDeleteAcountMutation,
  useGetAllAcountAdminQuery,
} from "../../../redux/api/acountApi";
import { useAppSelector } from "../../../store/hook";

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
}
const ListAcountAdmin = () => {
  const { data: acounts } = useGetAllAcountAdminQuery();
  const { user } = useAppSelector((state) => state.Authorization);
  const [removeAcount] = useDeleteAcountMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <div
            className={
              user?.id === id ? "pointer-events-none opacity-[0.5]" : ""
            }
          >
            <Popconfirm
              title="Block tài khoản"
              description="Bạn có chắc chắn muốn block tài khoản"
              onConfirm={() => {
                removeAcount(id).then(() => {
                  messageApi.open({
                    type: "success",
                    content: "Xóa tài khoản thành công",
                  });
                });
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Block</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];
  const dataConfig: DataType[] = acounts?.data?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
      email: item?.email,
      role: item?.role,
    };
  });
  return (
    <>
      {contextHolder}
      <div>
        <h1 className="text-2xl mb-6 bg-white p-2 rounded-md shadow-md">
          Danh sách tài khoản quản trị
        </h1>
        <div className="p-4">
          <Button type="default">
            <Link to={`/admin/addAcount`}>Thêm tài khoản</Link>
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataConfig}
          className="bg-white p-2 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ListAcountAdmin;

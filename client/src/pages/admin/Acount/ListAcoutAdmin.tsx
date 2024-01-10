import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { ICount, getAllAcountAdmin, removeAcount } from "../../../api/Acount";

interface DataType {
  key: string;
  name: string;
  email: string;
  role: string;
}
const ListAcountAdmin = () => {
  const [acounts, setAcounts] = useState<ICount[]>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllAcountAdmin();
        setAcounts(data.data);
        console.log(data.data);
        
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeAcount(id).then(() => {
                  setAcounts(acounts?.filter((item: ICount) => item.id !== id));
                  messageApi.open({
                    type: "success",
                    content: "Xóa tài khoản thành công",
                  });
                });
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const dataConfig: DataType[] = acounts?.map((item) => {
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
        <h1 className="text-2xl mb-6 bg-white p-2 rounded-md shadow-md">Danh sách tài khoản quản trị</h1>
        <div className="p-4">
          <Button type="default">
            <Link to={`/admin/addAcount`}>Thêm tài khoản</Link>
          </Button>
        </div>

        <Table columns={columns} dataSource={dataConfig} className="bg-white p-2 rounded-md shadow-md" />
      </div>
    </>
  );
};

export default ListAcountAdmin;
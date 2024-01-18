import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IBanner, getAllBanner, removeBanner } from "../../../api/Banner";

interface DataType {
  key: string;
  name: string;
}

const ListBanner = (props: Props) => {
  const [banner, setBanner] = useState<IBanner[]>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllBanner();
        setBanner(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "Ảnh banner",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img) => <img className="w-40 mx-auto" src={img} alt="anh" />,
    },
    {
      title:"Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => <p>{status == "active"? "Hiển thị":"Ẩn"}</p>

    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/banner/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa banner"
              description="Bạn có chắc chắn muốn xóa banner"
              onConfirm={() => {
                removeBanner(id).then(() => {
                  setBanner(banner?.filter((item: IBanner) => item.id !== id));
                  messageApi.open({
                    type: "success",
                    content: "Xóa banner thành công",
                  });
                });
              }}
              okType="default"
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

  const data: DataType[] = banner?.map((item: IBanner) => {
    return {
      key: item?.id,
      image: item?.name,
      status: item?.status,
    };
  });
  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/banner/add"}>Thêm banner</Link>
        </Button>
        <h1 className="text-2xl mb-6 mt-2 bg-white p-4 rounded-md shadow-md ">Danh sách ảnh banner</h1>
        <Table columns={columns} dataSource={data} className="bg-white p-4 rounded-md shadow-md" />
      </div>
    </>
  );
};

export default ListBanner;

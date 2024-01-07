import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
  IDirector,
  getAllDirector,
  removeDirector,
} from "../../../api/director";

interface DataType {
  key: string;
  name: string;
  imgae: string;
}
const ListDirector = () => {
  const [directors, setDirectors] = useState<IDirector[]>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllDirector();
        setDirectors(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên đạo diễn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh đạo diễn",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/director/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeDirector(id).then(() => {
                  setDirectors(
                    directors?.filter((item: IDirector) => item.id !== id)
                  );
                  messageApi.open({
                    type: "success",
                    content: "Xóa sản phẩm thành công",
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

  const data: DataType[] = directors?.map((item: IDirector) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
    };
  });

  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/director/add"}>Thêm đạo diễn</Link>
        </Button>
        <h1 className="text-2xl mb-6 mt-2 bg-white p-4 rounded-md shadow-md ">Danh sách đạo diễn</h1>
        <Table columns={columns} dataSource={data} className="bg-white p-4 rounded-md shadow-md" />
      </div>
    </>
  );
};

export default ListDirector;

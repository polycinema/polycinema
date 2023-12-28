import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { IGenre, getAllGenre, removeGenre } from "../../../api/genre";

interface DataType {
  key: string;
  name: string;
}
const ListGenre = () => {
  const [genres, setGenres] = useState<IGenre[]>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllGenre();
        setGenres(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/genres/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeGenre(id).then(() => {
                  setGenres(genres?.filter((item: IGenre) => item.id !== id));
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

  const dataConfig: DataType[] = genres?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
    };
  });
  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/genres/add"}>Thêm thể loại</Link>
        </Button>
        <h1 className="text-2xl m-6 ">Danh sách thể loại</h1>
        <Table columns={columns} dataSource={dataConfig} />
      </div>
    </>
  );
};

export default ListGenre;

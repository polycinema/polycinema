import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { Link } from "react-router-dom";
import { IActor, getAllActor, removeActor } from "../../../api/actor";
import { ColumnsType } from "antd/es/table";
interface DataType {
  key: string;
  name: string;
  image: string;
  date_of_birth: string;
}
const ListActor = () => {
  const [actors, setActors] = useState<IActor[]>();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllActor();
        setActors(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên diễn viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh diễn viên",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/actors/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeActor(id).then(() => {
                  setActors(actors?.filter((item: IActor) => item?.id !== id));
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

  const data: DataType[] = actors?.map((item: IActor) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
      date_of_birth: item?.date_of_birth,
    };
  });

  return (
    <>
      {contextHolder}
      <div>
        <Button className="m-4">
          <Link to={"/admin/actors/add"}>Thêm diễn viên</Link>
        </Button>
        <h1 className="text-2xl mb-6 bg-white p-4 rounded-md shadow-md ">Danh sách diễn viên</h1>
        <Table columns={columns} dataSource={data} className="bg-white p-4 rounded-md shadow-md" />
      </div>
    </>
  );
};

export default ListActor;

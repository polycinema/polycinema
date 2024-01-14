import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatVND";
import { useGetAllRoomsQuery } from "../../../redux/api/roomApi";

interface DataType {
  key: string;
  room_name?: string;
  single_seat?: number | string;
  double_seat?: number | string;
  special_seat?: number | string;
}
const ListRooms = () => {
  const {data:rooms} = useGetAllRoomsQuery()
  const [messageApi, contextHolder] = message.useMessage();

  

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên phòng",
      dataIndex: "room_name",
      key: "room_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số lượng ghế",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/rooms/${id}/edit`}>
            {" "}
            <Button> Edit </Button>
          </Link>

          {/* <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeRoom(id).then(() => {
                  setRooms(rooms?.filter((item: IRoom) => item.id !== id));
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
          </div> */}
        </Space>
      ),
    },
  ];

  const dataConfig: DataType[] = rooms?.data?.map((item) => {
    return {
      key: item?.id,
      room_name: item?.room_name,
      capacity: item?.capacity,

    };
  });
  return (
    <>
      {contextHolder}
      <div>
         <div className="md:flex justify-between items-center">
          <Button>
            <Link to={"/admin/rooms/add"}>Thêm phòng</Link>
          </Button>
          <div className="">
            {/* <GarbageComponent /> */}
          </div>
        </div>
        <h1 className="text-2xl my-6  bg-white p-4 rounded-md shadow-md">Danh sách phòng </h1>
        <Table columns={columns} dataSource={dataConfig} className="bg-white p-4 rounded-md shadow-md" />

      </div>
    </>
  );
};

export default ListRooms;

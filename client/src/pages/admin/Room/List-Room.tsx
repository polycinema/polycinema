import React, { useEffect, useState } from "react";

import { Badge, Button, Modal, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/formatVND";
import {
  useGetAllRoomsQuery,
  useGetRoomSoftQuery,
  useSoftDeleteRoomMutation,
} from "../../../redux/api/roomApi";
import { MdAutoDelete } from "react-icons/md";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import swal from "sweetalert";

interface DataType {
  key: string;
  room_name?: string;
  single_seat?: number | string;
  double_seat?: number | string;
  special_seat?: number | string;
}
const ListRooms = () => {
  const { data: rooms } = useGetAllRoomsQuery();
  const [softDelete, { isLoading }] = useSoftDeleteRoomMutation();
  const { data: roomsSoft } = useGetRoomSoftQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên phòng",
      dataIndex: "room_name",
      key: "room_name",
      align: "center",
    },
    {
      title: "Số lượng ghế",
      dataIndex: "capacity",
      key: "capacity",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/rooms/${id}/edit`}>
            {" "}
            <Button> Edit </Button>
          </Link>

          <div>
            <Popconfirm
              title="Ẩn phòng"
              description="Bạn có chắc chắn muốn ẩn phòng"
              onConfirm={() => {
                softDelete({ room_id: id }).then(() => {
                  messageApi.open({
                    type: "success",
                    content: "Ẩn phòng thành công",
                  });
                });
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
            </Popconfirm>
          </div>
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
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const dataSource = roomsSoft?.data?.map((item) => {
    return {
      key: item.id,
      name: item?.room_name,
      capacity: item?.capacity,
    };
  });
  const columnBanned = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng ghế",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      render: (_: any, { key: id }: any) => (
        <div className="space-x-3">
          <Popconfirm
            title="Bỏ ẩn phòng"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              softDelete({ room_id: id })
                .unwrap()
                .then(() => {
                  swal("Thành công!", "Bỏ ẩn thành công!", "success");
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Bỏ ẩn  thất bại , Vui lòng thử lại !",
                    "error"
                  );
                })
            }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div>
        <div className="md:flex justify-between items-center">
          <Button>
            <Link to={"/admin/rooms/add"}>Thêm phòng</Link>
          </Button>
          <div>
            <Badge count={roomsSoft?.data?.length} size="small">
              <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                Phòng đã bị ẩn
              </Button>
            </Badge>
            <Modal
              title="Danh sách sản phẩm ẩn"
              open={isModalOpenGarbage}
              width={1000}
              bodyStyle={{ maxHeight: "800px", overflow: "auto" }}
              onCancel={handleCancelGarbage}
              footer={null}
            >
              <Table dataSource={dataSource} columns={columnBanned} />
            </Modal>
          </div>
        </div>
        <h1 className="text-2xl my-6  bg-white p-4 rounded-md shadow-md text-[#0D5D9F] ">
          Danh sách phòng{" "}
        </h1>
        <Table
          columns={columns}
          dataSource={dataConfig}
          className="bg-white p-4 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ListRooms;

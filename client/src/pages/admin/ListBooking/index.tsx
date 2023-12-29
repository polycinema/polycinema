import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllBookingsQuery,
  useUpdateNotYetMutation,
  useUpdateSatisfiedMutation,
} from "../../../redux/api/checkoutApi";
import { FaDotCircle } from "react-icons/fa";
import { RootBooking } from "../../../interfaces/booking";
import { LoadingOutlined } from "@ant-design/icons";
import IsLoading from "../../../utils/IsLoading";

const ListsBooking = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery();
  const [
    updateSatisfied,
    { isLoading: loadingSatisfied, error: errSatisfied },
  ] = useUpdateSatisfiedMutation();
  const [updateNotYet, { isLoading: loadingNotYet, error: errNotYet }] =
    useUpdateNotYetMutation();
  const [listBooking, setListBooking] = useState<RootBooking>();
  // const [loading, setLoading] = useState(false);
  const [isModalOpenModal, setIsModalOpenModal] = useState(false);
  console.log("listBooking: ", listBooking);
  useEffect(() => {
    if (bookings) {
      setListBooking(bookings.data);
    }
  }, [bookings]);
  const handleCancelModal = () => {
    setIsModalOpenModal(false);
  };
  const handleOpenlModal = () => {
    setIsModalOpenModal(true);
  };
  if (errNotYet) {
    console.error(errNotYet);
  }
  if (errSatisfied) {
    console.error(errSatisfied);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  const columns: ColumnsType<any> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, booking) =>
        status === "not_yet" ? (
          <div className="flex items-center content-center gap-x-3">
            <FaDotCircle className="text-red-500" />
            <span>{status}</span>
            <button
              onClick={() => updateSatisfied(booking)}
              className="bg-red-500 px-3 py-1 rounded-md text-white"
            >
              {loadingSatisfied ? <LoadingOutlined /> : "satisfied"}
            </button>
          </div>
        ) : (
          <div className="flex items-center content-center gap-x-3">
            <FaDotCircle className="text-green-500" />
            <span>{status}</span>
            <button
              onClick={() => updateNotYet(booking)}
              className="bg-green-500 px-3 py-1 rounded-md text-white"
            >
              {loadingNotYet ? <LoadingOutlined /> : "not yet"}
            </button>
          </div>
        ),
    },
    {
      title: "Xem thêm",
      dataIndex: "more",
      key: "more",
      render: () => (
        <>
          <button onClick={handleOpenlModal} className="text-blue-500">
            xem thêm
          </button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <Button danger>Delete</Button>
          </a>
        </Space>
      ),
    },
  ];
  const dataTable: any = listBooking?.map((item: RootBooking) => {
    return {
      key: item?.id,
      id: item?.booking_id,
      name: item?.user?.name,
      email: item?.user?.email,
      total: item?.total_price,
      status: item?.status,
    };
  });

  return (
    <>
      <h1 className="text-center text-xl py-4 ">Danh sách vé đặt</h1>
      <Table columns={columns} dataSource={dataTable} pagination={false} />
      <Pagination
        style={{ marginTop: "16px", textAlign: "center" }}
        defaultCurrent={1}
        total={dataTable?.length}
        pageSize={5}
        showSizeChanger
        showQuickJumper
      />
      <Modal
            title={`Chi tiết vé đặt`}
            open={isModalOpenModal}
            // width={500}
            onCancel={handleCancelModal}
          ></Modal>
    </>
  );
};

export default ListsBooking;

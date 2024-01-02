import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Popconfirm,
  Space,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateNotYetMutation,
  useUpdateSatisfiedMutation,
} from "../../../redux/api/checkoutApi";
import { FaDotCircle } from "react-icons/fa";
import { RootBooking } from "../../../interfaces/booking";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa";
import IsLoading from "../../../utils/IsLoading";
import { formatCurrency } from "../../../utils/formatVND";
import dayjs from "dayjs";
import { dowloadExcel } from "../../../utils/exportXLSX";

const ListsBooking = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery();
  const [
    updateSatisfied,
    { isLoading: loadingSatisfied, error: errSatisfied },
  ] = useUpdateSatisfiedMutation();
  const [updateNotYet, { isLoading: loadingNotYet, error: errNotYet }] =
    useUpdateNotYetMutation();

  const [idBooking, setIdBooking] = useState<number | string>();
  const { data: bookingById, error: errBookingById } =
    useGetBookingByIdQuery(idBooking);

  const [listBooking, setListBooking] = useState<RootBooking>();
  const [BookingById, setBookingById] = useState<RootBooking>();
  const [isModalOpenModal, setIsModalOpenModal] = useState(false);

  console.log("listBooking: ", listBooking);
  // console.log("isloading: ",isLoading);
  // console.log("error: ",error);
  useEffect(() => {
    if (bookings) {
      setListBooking(bookings.data);
    }
    if (bookingById) {
      setBookingById(bookingById.data);
    }
  }, [bookings, bookingById]);
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
  if (errBookingById) {
    console.error(errBookingById);
  }
  const columns: ColumnsType<any> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (total) => <span>{formatCurrency(total)}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, booking) =>
        status === "not_yet" ? (
          <div className="flex items-center content-center gap-x-3 justify-center">
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
          <div className="flex items-center content-center gap-x-3 justify-center">
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
      align: "center",
      render: (_, { key: id }: { key: number | string }) => (
        <>
          <button
            onClick={() => {
              handleOpenlModal(), setIdBooking(id);
            }}
            className="text-blue-500"
          >
            <FaEye />
          </button>
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: () => (
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
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <div className="mb-2">
        <h1 className="text-center text-xl py-4 ">Danh sách vé đặt</h1>
        <Popconfirm
          title="Export excel"
          description="Bạn có muốn xuất file xlsx?"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          onConfirm={() => dowloadExcel(listBooking)}
          onCancel={cancel}
          okType="text"
          okText="Yes"
          cancelText="No"
        >
          <button className="flex gap-x-2 justify-center items-center py-1 px-4 bg-[#11235A] text-white rounded-md">
            <FaFileExport />
            Excel
          </button>
        </Popconfirm>
      </div>
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
        bodyStyle={{ height: "500px", overflow: "auto" }}
        onCancel={handleCancelModal}
      >
        <>
          <div className="mx-auto p-4 w-full">
            <div className="bg-white p-4 rounded shadow-md grid grid-cols-2">
              <div className="">
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Mã thanh toán:</span>
                  <span className="text-gray-600">
                    #{BookingById?.booking_id}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Trạng thái:</span>
                  <span className="text-gray-600">
                    {BookingById?.status === "not_yet"
                      ? "Chưa lấy vé"
                      : "Đã lấy vé"}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Tên phim:</span>
                  <span className="text-gray-600 line-clamp-1">
                    {BookingById?.showtime?.movie?.name}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Rạp chiếu:</span>
                  <span className="text-gray-600">Polycinema</span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Phòng chiếu:</span>
                  <span className="text-gray-600">
                    {BookingById?.seats[1]?.showtime?.room?.room_name}
                  </span>
                </div>
              </div>
              <div className="">
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block  font-semibold">Chỗ ngồi:</span>
                  <span className="text-gray-600">
                    {BookingById?.seats?.map((seat) => (
                      <span key={seat?.id}>{seat?.seat_name}</span>
                    ))}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Giờ chiếu:</span>
                  <span className="text-gray-600">
                    {BookingById?.showtime?.start_time}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Ngày đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("DD/MM.YYYY")}
                  </span>
                </div>

                <div className="border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Giờ đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("HH:mm:ss")}
                  </span>
                </div>
                <div className="border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Combo:</span>
                  <span className="text-gray-600">
                    {BookingById?.products?.map((item) => (
                      <span key={item?.id}>{item?.name},</span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="p-2 text-xl">
                <span className="block mb-2 font-semibold ">Tổng tiền:</span>
                <span className="text-gray-600">
                  {formatCurrency(BookingById?.total_price)}
                </span>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default ListsBooking;
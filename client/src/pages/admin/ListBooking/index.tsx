import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Pagination,
  Popconfirm,
  Table,
  message,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useSoftDeleteBookingMutation,
  useUpdateNotYetMutation,
  useUpdateSatisfiedMutation,
} from "../../../redux/api/checkoutApi";
import { FaDotCircle } from "react-icons/fa";
import { RootBooking } from "../../../interfaces/booking";
import {
  DeleteOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa";
import IsLoading from "../../../utils/IsLoading";
import { formatCurrency } from "../../../utils/formatVND";
import dayjs from "dayjs";
import { dowloadExcel } from "../../../utils/exportXLSX";
import { FcOk } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
import GarbageComponent from "../../../components/Garbage";
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
  const [
    softDeleteBooking,
    { isLoading: loadingSoftDeleteBooking, error: errSoftDeleteBooking },
  ] = useSoftDeleteBookingMutation();
  
  const [listBooking, setListBooking] = useState();
  const [BookingById, setBookingById] = useState<RootBooking>();
  const [isModalOpenModal, setIsModalOpenModal] = useState(false);
  // console.log("bookingsSoft: ", bookingsSoft);
  useEffect(() => {
    if (bookings) {
      setListBooking(bookings?.data?.bookings);
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
    console.error('errNotYet: ',errNotYet);
  }
  if (errSatisfied) {
    console.error("errSatisfied: ",errSatisfied);
  }
  if (errSoftDeleteBooking) {
    console.error("errSoftDeleteBooking: ",errSoftDeleteBooking);
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

  const inforBooking = listBooking?.map((items: RootBooking) => {
    return {
      booking_id: items?.booking_id,
      total_price: items?.total_price,
      status: items?.status,
      user: items?.user?.name,
      email: items?.user?.email,
      phone: items?.user?.phone,
      movieName: items?.showtime?.movie.name,
      showtime: items?.showtime?.show_date,
      showDate: items?.showtime?.show_date,
      startTime: items?.showtime?.start_time,
    };
  });
  // console.log("inforBooking: ", inforBooking);
  const titleVN_XLSX = {
    booking_id: "Mã vé đặt",
    total_price: "Tổng tiền",
    status: "Trạng thái",
    user: "Khách hàng",
    email: "Email",
    phone: "Số điện thoại",
    showtime: "Lịch chiếu",
    movieName: "Tên phim",
    showDate: "Ngày đặt",
    startTime: "Giờ chiếu",
    // seatName: "Ghế ngồi",
    // typeSeat: "Loại ghế",
    // roonName: "Phòng chiếu",
  };
  const dataXLSX = inforBooking?.map((items: RootBooking) => {
    const translatedData = {};
    Object.keys(items).forEach((key) => {
      const translatedKey = titleVN_XLSX[key] || key;
      translatedData[translatedKey] = items[key];
    });

    return translatedData;
  });
  // console.log('dataXLSX: ',dataXLSX)
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
            <span>Chưa lấy vé</span>
            <button
              onClick={() => updateSatisfied(booking)}
              className="bg-green-500 px-3 py-1 rounded-md text-white"
            >
              {loadingSatisfied ? <LoadingOutlined /> : "Xuất vé"}
            </button>
          </div>
        ) : (
          <div className="flex items-center content-center gap-x-3 justify-center">
            <FaDotCircle className="text-green-500" />
            <span>Đã lấy vé</span>
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
      render: (_: any, { key: id }: any) => (
        // console.log('booking ---: ',id)
        <Popconfirm
          title="Xóa xóa vé đặt"
          description="Bạn có chắc muốn xóa?"
          onConfirm={() =>
            softDeleteBooking({booking_id: id})
              .unwrap()
              .then(() => {
                notification.success({
                  message: "Delete showtime sucessfuly!",
                });
              })
          }
          okText="Yes"
          okType="default"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
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
      nameMovie: item?.showtime.movie.name
    };
  });
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <div className=" grid grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-md p-4 ">
          <p className="text-2xl p-4 flex items-center gap-2">
            <span>Tổng vé đã đặt</span>
            <span>
              <FcFilm />
            </span>
          </p>
          <p className="text-4xl font-bold text-center">
            {bookings?.data?.total_bookings}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4 ">
          <p className="text-2xl p-4 flex items-center gap-2">
            <span>Đơn đã lấy vé</span>
            <span>
              <FcOk />
            </span>
          </p>
          <p className="text-4xl font-bold text-center">
            {bookings?.data?.satisfieds}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4 ">
          <p className="text-2xl p-4 flex items-center gap-2">
            <span>Đơn chưa lấy vé</span>
            <span>
              <FcInfo />
            </span>
          </p>
          <p className="text-4xl font-bold text-center">
            {bookings?.data?.not_yet}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4 ">
          <p className="text-2xl p-4 flex items-center gap-2">
            <span>Đơn hủy vé</span>
            <span>
              <FcHighPriority />
            </span>
          </p>
          <p className="text-4xl font-bold text-center">
            {bookings?.data?.hide}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <h1 className="text-center text-xl py-4 ">Danh sách vé đặt</h1>
        <div className="md:flex gap-x-3 justify-between">
          <Popconfirm
            title="Export excel"
            description="Bạn có muốn xuất file xlsx?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => dowloadExcel(dataXLSX)}
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
          <div className="">
            <GarbageComponent/>
          </div>
        </div>
      </div>
      <Table
        className="shadow-md rounded-md"
        columns={columns}
        dataSource={dataTable}
        pagination={false}
      />
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
                    #{BookingById?.booking_id ?? "Không có"}
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
                    {BookingById?.showtime?.movie?.name ?? "Không có"}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Rạp chiếu:</span>
                  <span className="text-gray-600">Polycinema</span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Phòng chiếu:</span>
                  <span className="text-gray-600">
                    {BookingById?.seats[0]?.showtime?.room?.room_name ??
                      "Không có"}
                  </span>
                </div>
              </div>
              <div className="">
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block  font-semibold">Chỗ ngồi:</span>
                  <span className="text-gray-600">
                    {BookingById?.seats?.map((seat) => (
                      <span key={seat?.id}>{seat?.seat_name}</span>
                    )) ?? "Không có"}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Giờ chiếu:</span>
                  <span className="text-gray-600">
                    {BookingById?.showtime?.start_time ?? "Không có"}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Ngày đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("DD/MM.YYYY") ??
                      "Không có"}
                  </span>
                </div>

                <div className="border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Giờ đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("HH:mm:ss") ??
                      "Không có"}
                  </span>
                </div>
                <div className="border-b pb-4 p-2 text-base">
                  <span className="block mb-2 font-semibold">Combo:</span>
                  <span className="text-gray-600">
                    {BookingById?.products?.map((item) => (
                      <span key={item?.id}>{item?.name}</span>
                    )) ?? "Không có"}
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

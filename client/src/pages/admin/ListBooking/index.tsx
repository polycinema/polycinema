import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputRef,
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
  useSoftDeleteBookingMutation,
  useUpdateCancelMutation,
  useUpdateSatisfiedMutation,
} from "../../../redux/api/checkoutApi";
import { FaDotCircle, FaEyeSlash } from "react-icons/fa";
import { RootBooking } from "../../../interfaces/booking";
import {
  LoadingOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
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
import swal from "sweetalert";
import { ColumnType } from "antd/es/list";
import { FilterConfirmProps } from "antd/es/table/interface";
type DataIndex = keyof DataType;
const ListsBooking = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery();
  const [
    updateSatisfied,
    { isLoading: loadingSatisfied, error: errSatisfied },
  ] = useUpdateSatisfiedMutation();
  const [updateCancel, { isLoading: loadingCancel, error: errCancel }] =
    useUpdateCancelMutation();

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  useEffect(() => {
    if (bookings) {
      setListBooking(bookings?.data?.bookings);
    }
    if (bookingById) {
      setBookingById(bookingById?.data);
    }
  }, [bookings, bookingById]);
  const handleCancelModal = () => {
    setIsModalOpenModal(false);
  };
  const handleOpenlModal = () => {
    setIsModalOpenModal(true);
  };
  if (errCancel) {
    message.error(errCancel);
  }
  if (errSatisfied) {
    message.error(errSatisfied);
  }
  if (errSoftDeleteBooking) {
    message.error(errSoftDeleteBooking);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  if (errBookingById) {
    message.error(errBookingById);
  }

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text?.toString()),
  });
  const inforBooking = listBooking?.map((items: RootBooking) => {
    return {
      booking_id: items?.booking_id,
      total_price: items?.total_price,
      status: items?.status,
      user: items?.user?.name,
      email: items?.user?.email,
      phone: items?.user?.phone,
      movieName: items?.showtime?.movie?.name,
      showtime: items?.showtime?.show_date,
      showDate: dayjs(items?.showtime?.created_at).format("DD-MM-YYYY"),
      startTime: items?.showtime?.start_time,
      seatName: items.seats.map((items) => items.seat_name),
      roonName: items.seats.map((items) => items.showtime.room.room_name),
    };
  });
  const titleVN_XLSX = {
    booking_id: "Mã vé đặt",
    total_price: "Tổng tiền",
    status: "Trạng thái",
    user: "Khách hàng",
    email: "Email",
    phone: "Số điện thoại",
    showtime: "Ngày chiếu",
    movieName: "Tên phim",
    showDate: "Ngày đặt",
    startTime: "Giờ chiếu",
    seatName: "Ghế ngồi",
    roonName: "Phòng chiếu",
  };
  const dataXLSX = inforBooking?.map((items: RootBooking) => {
    const translatedData = {};
    Object.keys(items).forEach((key) => {
      const translatedKey = titleVN_XLSX[key] || key;
      translatedData[translatedKey] = items[key];
    });

    return translatedData;
  });
  const columns: ColumnsType<any> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
      align: "center",
      ...getColumnSearchProps("id"),
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
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      ...getColumnSearchProps("phone"),
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
      type: "default",
      render: (status, booking) =>
        status === "not_yet" ? (
          <div className="flex items-center content-center gap-x-3 justify-center">
            <FaDotCircle className="text-blue-500" />
            <span>Chưa lấy vé</span>
            <button
              onClick={() => updateSatisfied(booking)}
              className="bg-green-500 px-3 py-1 rounded-md text-white"
            >
              {loadingSatisfied ? <LoadingOutlined /> : "Xuất vé"}
            </button>
            <button
              onClick={() => updateCancel(booking)}
              className="bg-red-500 px-3 py-1 rounded-md text-white"
            >
              {loadingCancel ? <LoadingOutlined /> : "Hủy vé"}
            </button>
          </div>
        ) : status === "satisfied" ? (
          <div className="flex items-center content-center gap-x-3 justify-center">
            <FaDotCircle className="text-green-500" />
            <span>Đã lấy vé</span>
          </div>
        ) : (
          <div className="flex items-center content-center gap-x-3 justify-center">
            <FaDotCircle className="text-red-500" />
            <span>Vé đã hủy</span>
          </div>
        ),
      filters: [
        {
          text: "Chưa lấy vé",
          value: "not_yet",
        },
        {
          text: "Đã lấy vé",
          value: "satisfied",
        },
        {
          text: "Đã hủy vé",
          value: "cancel",
        },
      ],
      onFilter: (value: string, record) => record.status.indexOf(value) === 0,
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
      render: ({ status }: any, { key: id }: any) => (
        <Popconfirm
          title="Ẩn vé đặt"
          description="Bạn có chắc muốn ẩn?"
          onConfirm={() =>
            softDeleteBooking({ booking_id: id })
              .unwrap()
              .then(() => {
                swal("Thành công!", "Ẩn vé thành công!", "success");
              })
              .catch(() => {
                swal(
                  "Thất bại!",
                  "Ẩn vé thất bại , Vui lòng thử lại !",
                  "error"
                );
              })
          }
          okText="Yes"
          okType="default"
          cancelText="No"
        >
          <Button
            className={`text-blue-500 ${
              status == "not_yet" ? " pointer-events-none opacity-60 " : ""
            }`}
            icon={<FaEyeSlash />}
          />
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
      phone: item?.user?.phone,
      total: item?.total_price,
      status: item?.status,
      nameMovie: item?.showtime?.movie?.name,
    };
  });
  const cancel = (e) => {
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
            {bookings?.data?.cancel}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <h1 className="text-center text-2xl py-4 text-[#0D5D9F]">Danh sách vé đặt</h1>
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
            <GarbageComponent />
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
        width={600}
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
                      : BookingById?.status === "cancel"
                      ? "Đã hủy vé"
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
                  <span className="block  font-semibold">Rạp chiếu:</span>
                  <span className="text-gray-600">Polycinema</span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block  font-semibold">Phòng chiếu:</span>
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
                    {BookingById?.seats?.map((seat, index: number) => (
                      <span key={seat?.id}>
                        {seat?.seat_name}
                        {index < BookingById?.seats.length - 1 ? ", " : ""}
                      </span>
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
                  <span className="block font-semibold">Ngày chiếu:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.showtime?.show_date).format(
                      "DD/MM/YYYY"
                    ) ?? "Không có"}
                  </span>
                </div>
                <div className=" border-b pb-4 p-2 text-base">
                  <span className="block font-semibold">Ngày đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("DD/MM/YYYY") ??
                      "Không có"}
                  </span>
                </div>

                <div className="border-b pb-4 p-2 text-base">
                  <span className="block  font-semibold">Giờ đặt:</span>
                  <span className="text-gray-600">
                    {dayjs(BookingById?.created_at).format("HH:mm:ss") ??
                      "Không có"}
                  </span>
                </div>
              </div>
              <div className="p-2 text-base">
                <span className="block font-semibold">Combo:</span>
                <span className="text-gray-600">
                  {BookingById?.products?.map((item) => (
                    <span key={item?.id}>{item?.name}</span>
                  )) ?? "Không có"}
                </span>
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

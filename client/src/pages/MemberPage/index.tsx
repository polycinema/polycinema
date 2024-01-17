import { Modal, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import InfoAccount from "../../components/userinfo/InfoAccount";
import "./index.css";
import PointUser from "../../components/PointUser/PointUser";
import {
  useGetAllBookingsQuery,
  useGetBookingsByUserQuery,
} from "../../redux/api/checkoutApi";
import { useAppSelector } from "../../store/hook";
import dayjs from "dayjs";
import { BiSolidShow } from "react-icons/bi";
import { formatCurrency } from "../../utils/formatVND";
import { FaDotCircle } from "react-icons/fa";
type Props = {};

const MemberPage = (props: Props) => {
  const { user } = useAppSelector((state) => state.Authorization);
  const { data: booking } = useGetBookingsByUserQuery(user?.id);
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailBooking, setDetailBooking] = useState();
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const onHandleDetail = (value) => {
    setDetailBooking(value);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1150px] mx-auto member__container my-5">
      <div className="flex space-x-5 my-5">
        <button
          onClick={() => handleTabClick(1)}
          className={`p-2 focus:outline-none ${
            activeTab === 1 ? "bg-[#03599D] text-white" : "bg-gray-200"
          }`}
        >
          Thông tin tài khoản
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`p-2 focus:outline-none ${
            activeTab === 2 ? "bg-[#03599D] text-white" : "bg-gray-200"
          }`}
        >
          Đơn hàng của tôi
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`p-2 focus:outline-none ${
            activeTab === 3 ? "bg-[#03599D] text-white" : "bg-gray-200"
          }`}
        >
          Kho Voucher
        </button>
      </div>

      <div>
        {activeTab === 1 && (
          <div>
            <InfoAccount />
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Mã thanh toán</th>
                  <th className="border border-gray-400 p-2">Phim</th>
                  <th className="border border-gray-400 p-2">Rạp chiếu</th>
                  <th className="border border-gray-400 p-2">Chỗ ngồi</th>
                  <th className="border border-gray-400 p-2">Phòng chiếu</th>
                  <th className="border border-gray-400 p-2">Ngày chiếu</th>
                  <th className="border border-gray-400 p-2">Giờ chiếu</th>
                  <th className="border border-gray-400 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {booking?.data?.map((item: any) => {
                  return (
                    <tr key={item?.id}>
                      <td className="border border-gray-400 p-2 text-center">
                        #{item?.booking_id}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        {item?.showtime?.movie?.name}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        Polycinema
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        {item?.seats?.map((item) => (
                          <span key={item?.id} className="mx-2">
                            {item?.seat_name},
                          </span>
                        ))}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        {item?.seats[0]?.showtime?.room?.room_name}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        {dayjs(item?.showtime?.show_date).format("DD/MM.YYYY")}
                      </td>
                      <td className="border border-gray-400 p-2 text-center">
                        {item?.showtime?.start_time}
                      </td>
                      <td className="p-3 border-b border-gray-400 flex justify-center items-center text-xl text-[#42a5f5] ">
                        <button onClick={() => onHandleDetail(item)}>
                          <BiSolidShow />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <PointUser />
          </div>
        )}
      </div>
      <Modal
        title={`Chi tiết đơn hàng`}
        open={isModalOpen}
        onCancel={handleCancel}
        bodyStyle={{ height: "500px" }}
      >
        <div className=" mx-auto p-4 w-full">
          <div className="bg-white  rounded shadow-md   grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-1">
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block font-semibold">Mã thanh toán:</span>
              <span className="text-gray-600">
                #{detailBooking?.booking_id}
              </span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block font-semibold">Tên phim:</span>
              <span className="text-gray-600">
                {detailBooking?.showtime?.movie?.name}
              </span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Rạp chiếu:</span>
              <span className="text-gray-600">Polycinema</span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Phòng chiếu:</span>
              <span className="text-gray-600">
                {detailBooking?.seats[0]?.showtime?.room?.room_name}
              </span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Chỗ ngồi:</span>
              <span className="text-gray-600 flex flex-wrap gap-1">
                {detailBooking?.seats?.map((seat) => (
                  <span key={seat?.id}>{seat?.seat_name},</span>
                ))}
              </span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Giờ chiếu:</span>
              <span className="text-gray-600">
                {detailBooking?.showtime?.start_time}
              </span>
            </div>
            <div className=" border-b pb-4 p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Ngày chiếu:</span>
              <span className="text-gray-600">
                {dayjs(detailBooking?.showtime?.show_date).format("DD/MM.YYYY")}
              </span>
            </div>

            <div className="border-b p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Giờ đặt:</span>
              <span className="text-gray-600">
                {dayjs(detailBooking?.created_at).format("HH:mm:ss")}
              </span>
            </div>
            <div className="border-b p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Combo:</span>
              <span className="text-gray-600">
                {detailBooking?.products?.map((item) => (
                  <span key={item?.id}>{item?.name},</span>
                ))}
              </span>
            </div>
            <div className="border-b p-2 text-lg flex gap-2">
              <span className="block mb-2 font-semibold">Trạng thái:</span>
              <span className="text-gray-600">
                {detailBooking?.status === "not_yet" ? (
                  <div className="flex items-center content-center gap-x-3 justify-center">
                    <FaDotCircle className="text-blue-500" />
                    <span>Chưa lấy vé</span>
                  </div>
                ) : detailBooking?.status === "cancel" ? (
                  <div className="flex items-center content-center gap-x-3 justify-center">
                    <FaDotCircle className="text-red-500" />
                    <span>Đã hủy vé</span>
                  </div>
                ) : (
                  <div className="flex items-center content-center gap-x-3 justify-center">
                    <FaDotCircle className="text-green-500" />
                    <span>Đã lấy vé</span>
                  </div>
                )}
              </span>
            </div>
            <div className="p-2 text-xl flex gap-2">
              <span className="block mb-2 font-semibold ">Tổng tiền:</span>
              <span className="text-gray-600">
                {formatCurrency(detailBooking?.total_price)}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemberPage;

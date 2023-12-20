import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import InfoAccount from "../../components/userinfo/InfoAccount";
import "./index.css";
import PointUser from "../../components/PointUser/PointUser";
import { useGetAllBookingsQuery } from "../../redux/api/checkoutApi";
import { useAppSelector } from "../../store/hook";
import dayjs from "dayjs";
type Props = {};

const MemberPage = (props: Props) => {
  const { data: booking } = useGetAllBookingsQuery();
  const { user } = useAppSelector((state) => state.Authorization);
        
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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
          Điểm Poly
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
                  <th className="border border-gray-400 p-2">Combo</th>
                  <th className="border border-gray-400 p-2">Ngày đặt</th>
                </tr>
              </thead>
              <tbody>
                {booking?.data
                  ?.filter((item) => item?.user_id === user?.id)
                  ?.map((item: any) => {
                    return (
                      <tr>
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
                        {item?.seats?.map(item=><span className="mx-2">{item?.seat_name},</span>)}
                        </td>
                        <td className="border border-gray-400 p-2 text-center">
                          {item?.products.map(item=><span className="mx-2">{item?.name},</span>)}
                        </td>
                        <td className="border border-gray-400 p-2 text-center">
                          {dayjs(item?.created_at).format("DD/MM.YYYY") }
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
    </div>
  );
};

export default MemberPage;

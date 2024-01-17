import React from "react";
import { useDashBoardQuery } from "../../../redux/api/statisticApi";
import { useAppSelector } from "../../../store/hook";
import { formatCurrency } from "../../../utils/formatVND";
import {
  FcAlarmClock,
  FcButtingIn,
  FcCurrencyExchange,
  FcFilm,
} from "react-icons/fc";
import {Table, Tag } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const DashBoard = () => {
  const { data: dashboard } = useDashBoardQuery();
  
  const { user } = useAppSelector((state) => state.Authorization);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Tên phim",
      dataIndex: "name_movie",
      key: "name_movie",
      align: "center",
      render:(name_movie)=> <p className="text-lg">{name_movie}</p>
    },
    {
      title: "Ảnh",
      dataIndex: "image_movie",
      key: "image_movie",
      align: "center",
      render: (img) => (
        <img
          className="w-24 h-24 rounded-full mx-auto object-cover"
          src={img}
          alt=""
        />
      ),
    },
    {
      title: "Phòng chiếu",
      dataIndex: "room_name",
      key: "room_name",
      align: "center",
      render:(room_name)=> <p className="text-lg">{room_name}</p>
    },
    {
      title: "Ngày chiếu",
      key: "show_date",
      dataIndex: "show_date",
      align: "center",
      render: (show_date) => (
        <Tag className="text-lg" color="geekblue">
          {dayjs(show_date).format("DD/MM/YYYY")}
        </Tag>
      ),
    },
    {
      title: "Giờ chiếu",
      key: "start_time",
      dataIndex: "start_time",
      align: "center",
      render: (start_time) => (
        <>
          <Tag className="text-lg" color="green">
            {start_time}
          </Tag>
        </>
      ),
    },
  ];

  const data: DataType[] = dashboard?.showtimes_today?.map((item) => {
    return {
      key: item?.id,
      name_movie: item?.movie?.title,
      image_movie: item?.movie?.image,
      room_name: item?.room?.room_name,
      show_date: item?.show_date,
      start_time: item?.start_time,
    };
  });
  return (
    <div className="ml-5 grid grid-cols-6 gap-5">
      <div className="col-span-5">
        <div className="grid grid-cols-4 gap-10 ">
          <div className="bg-white px-2 py-4 rounded-md shadow-md flex items-center gap-4">
            <p className="text-5xl bg-[#525FE1] p-2 rounded-md ">
              <FcButtingIn />
            </p>
            <p className="flex flex-col">
              <span className="text-2xl text-gray-400">Người dùng</span>
              <span className="text-2xl">{dashboard?.new_users}</span>
            </p>
          </div>
          <div className="bg-white px-2 py-4 rounded-md shadow-md flex items-center gap-4">
            <p className="text-5xl bg-[#008170] p-2 rounded-md ">
              <FcCurrencyExchange />
            </p>
            <p className="flex flex-col">
              <span className="text-2xl text-gray-400">Doanh thu</span>
              <span className="text-2xl">
                {formatCurrency(dashboard?.total_revenue_today)}
              </span>
            </p>
          </div>
          <div className="bg-white px-2 py-4 rounded-md shadow-md flex items-center gap-4">
            <p className="text-5xl bg-[#F8E559] p-2 rounded-md ">
              <FcAlarmClock />
            </p>
            <p className="flex flex-col">
              <span className="text-2xl text-gray-400">Lịch chiếu</span>
              <span className="text-2xl">{dashboard?.count_showtimes}</span>
            </p>
          </div>
          <div className="bg-white px-2 py-4 rounded-md shadow-md flex items-center gap-4">
            <p className="text-5xl bg-[#86A7FC] p-2 rounded-md ">
              <FcFilm />
            </p>
            <p className="flex flex-col">
              <span className="text-2xl text-gray-400">Đơn hàng</span>
              <span className="text-2xl">{dashboard?.count_new_bookings}</span>
            </p>
          </div>
        </div>
        <div className="bg-white py-2 mt-11 rounded-md shadow-md">
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white px-2 py-4 rounded-md shadow-md flex items-center gap-4">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={user?.image}
            alt=""
          />
          <p className="flex flex-col">
            <span className="text-xl ">{user?.name}</span>
            <span className="text-gray-400">{user?.email}</span>
          </p>
        </div>
        <div className="bg-white py-2 mt-11  rounded-md shadow-md ">
          {dashboard?.users_bookings?.map((item) => (
            <div key={item?.id} className=" px-2 py-2  flex items-center gap-2">
                {item?.image?<img
                className="w-14 h-14 rounded-full object-cover"
                src={item?.image}
                alt="anh"
              /> : <img
              className="w-14 h-14 rounded-full object-cover"
              src={"https://res.cloudinary.com/dbktpvcfz/image/upload/v1705436466/thumb001_hsx0kj.webp"}
              alt="anh"
            />  }
              
              <p className="flex flex-col">
                <span className="text-gray-400">{item?.name}</span>
                <span className="">{item?.email}</span>
                <span className="text-lg flex ">
                  <p>Tổng tiền:</p>
                  {formatCurrency(item?.bookings_sum_total_price)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;

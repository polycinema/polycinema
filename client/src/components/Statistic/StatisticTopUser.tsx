import React from "react";
import { useGetTopUserQuery } from "../../redux/api/statisticApi";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { formatCurrency } from "../../utils/formatVND";

const StatisticTopUser = () => {
  const { data: TopUser } = useGetTopUserQuery();

  const dataSource = TopUser?.data?.map((items: ITop10Movie) => {
    return {
      name: items.name,
      email: items.email,
      image: items.image,
      phone: items.phone,
      bookings_count: items.bookings_count,
      bookings_sum_total_price: items.bookings_sum_total_price,
    };
  });
  const columns: ColumnsType<ColumnTypeTopMovie> = [
    {
      title: "Tên Phim",
      dataIndex: "name",
      key: "name",
      align: "center",
      fixed: "left",
      render: (name) => <span className="line-clamp-2">{name}</span>,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      key: "image",
      align: "center",
      fixed: "left",
      render: (image) => (
        <img className="w-20 h-20 object-cover mx-auto rounded-full" src={image} alt="" />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: 250,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align: "center",

    },
    {
      title: "Tổng đơn đã đặt",
      dataIndex: "bookings_count",
      key: "bookings_count",
      align: "center",
      render: (bookings_count) => <p>{bookings_count} đơn</p>,
    },
    {
      title: "Doanh thu",
      dataIndex: "bookings_sum_total_price",
      key: "bookings_sum_total_price",
      align: "center",
      width: 100,
      render: (bookings_sum_total_price) => (
        <span>{formatCurrency(bookings_sum_total_price)}</span>
      ),
    },
  ];
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default StatisticTopUser;

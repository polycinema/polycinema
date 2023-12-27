import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from 'antd';
import { useGetStatisticMonthQuery, useGetStatisticWeekQuery, useGetStatisticyearQuery } from '../../redux/api/statisticApi';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistic = () => {
  const [dateRange, setDateRange] = useState(1); // 1: Tuần, 2: Tháng, 3: Năm
  const { data: statistic, isLoading: isMonthLoading, refetch: refetchMonth } = useGetStatisticMonthQuery();
  const { data: weekStatistic, isLoading: isWeekLoading, refetch: refetchWeek } = useGetStatisticWeekQuery();
  const { data: yearStatistic, isLoading: isYearLoading, refetch: refetchYear } = useGetStatisticyearQuery();
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const onClick7Day = async () => {
    setDateRange(1);
    await refetchWeek(); // Gọi lại API tuần khi người dùng chọn tuần
  };

  const onClick8Day = async () => {
    setDateRange(2);
    await refetchMonth(); // Gọi lại API tháng khi người dùng chọn tháng
  };

  const onClick9Day = async () => {
    setDateRange(3);
    await refetchYear(); // Gọi lại API năm khi người dùng chọn năm
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
      datalabels: {
        display: true,
        color: 'black',
        anchor: 'end',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 10,
        // Đặt bước cho trục y
      },
    },
  };

  const labels = isMonthLoading ? "Date" :
    dateRange === 1 ? weekStatistic?.data?.daily_bookings?.map((item) => dayjs(item.date).format("DD/MM/YYYY")) :
      dateRange === 2 ? statistic?.data?.daily_bookings?.map((item) => dayjs(item.date).format("DD/MM/YYYY")) :
        dateRange === 3 ? yearStatistic?.data?.daily_bookings?.map((item) => dayjs(item.date).format("DD/MM/YYYY")) :
          [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Tổng số đơn hàng',
        data: isMonthLoading ? 0 :
          dateRange === 1 ? weekStatistic?.data?.daily_bookings?.map((item) => item?.booking_count) :
            dateRange === 2 ? statistic?.data?.daily_bookings?.map((item) => item?.booking_count) :
              dateRange === 3 ? yearStatistic?.data?.daily_bookings
                ?.map((item) => item?.booking_count) :
                [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <>
      <div className='space-x-3'>
        <Button onClick={onClick7Day}>7 ngày gần nhất</Button>
        <Button onClick={onClick8Day}>28 ngày gần nhất</Button>
        <Button onClick={onClick9Day}>1 năm</Button>
      </div>
      <div className='m-2'>
        <div className='m-2 text-2xl'>
                {dateRange === 1 ?   "Thống kê 7 ngày gần nhất" :
                dateRange === 2 ? "Thống kê 28 ngày gần nhất" :
                dateRange === 3 ? "Thống kê 1 năm" :
                        "Thống kê"}
        </div>
        <div className='m-2 text-sm'>
          Tổng doanh thu : <span>{formatCurrency(
        dateRange === 1 ?   weekStatistic?.data?.total_revenue :
            dateRange === 2 ? statistic?.data?.total_revenue :
              dateRange === 3 ? yearStatistic?.data?.total_revenue :
                0)}</span>
        </div>
      </div>
      <Bar data={data} options={options} />;
    </>
  );
}

export default Statistic;
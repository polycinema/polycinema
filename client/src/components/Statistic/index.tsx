import React from 'react'
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
// import faker from 'faker';

ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
);

const Statistic = () => {
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
                        // tooltip: {
                        //   mode: 'index', // Chế độ hiển thị tooltip theo index của dữ liệu
                        //   intersect: false, // Không yêu cầu chuột phải chạm vào cột
                        // },
                },
                scales: {
                        y: {
                                beginAtZero: true,
                                stepSize: 10,
                                // Đặt bước cho trục y
                        },
                },
        };

        const labels = ['1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'];

        const data = {
                labels,
                datasets: [

                        {
                                label: 'Tổng số đơn hàng',
                                data: [1, 2],
                                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                ],
        };

        return (
                <>
                        <div className='space-x-3'>
                                <Button>Tuần</Button>
                                <Button>Tháng</Button>
                                <Button>Năm</Button>
                        </div>
                        <Bar data={data} options={options} />;

                </>
        )
}

export default Statistic
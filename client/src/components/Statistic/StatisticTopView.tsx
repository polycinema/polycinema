import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useGetTopViewQuery } from '../../redux/api/statisticApi';
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticTopView = () => {
  const {data} = useGetTopViewQuery()
        const data1 = {
                labels:data?.data?.map((item)=> item.name),
                datasets: [
                  {
                    label: 'Lượt xem',
                    data: data?.data?.map((item)=> item.views),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(42, 16, 239, 0.2)',
                      'rgba(129, 6, 174, 0.2)',
                      'rgba(219, 193, 221, 0.2)',
                      'rgba(215, 251, 11, 0.304)',
                      'rgba(24, 78, 3, 0.299)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      '#cfff40',
                      '#f103e1',
                      '#a1f9bb',
                      '#ff004c',
                      '#00f2ff',
                    ],
                    borderWidth: 1,
                  },
                ],
              };
  return (
        <div className=''>
        <h1 className='text-xl flex justify-center p-4 text-[#0D5D9F]'>Top phim có lượt xem cao</h1>
        <Pie data={data1} />
      </div>
  )
}

export default StatisticTopView
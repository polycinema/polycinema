import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticTopView = () => {
        const data = {
                labels: ['Phim 1', 'Phim2', 'Phim 3', 'Phim 4', 'Phim 5', 'Phim 6'],
                datasets: [
                  {
                    label: 'Lượt xem',
                    data: [1, 20, 100, 200, 2, 3],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              };
  return (
        <div className=''>
        <h1 className='text-2xl'>Top 10 Phim có lượt xem nhiều nhất</h1>
        <Pie data={data} />
      </div>
  )
}

export default StatisticTopView
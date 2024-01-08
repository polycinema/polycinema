import React from 'react'
import { useGetTop1MovieQuery } from '../../redux/api/statisticApi'
import { formatCurrency } from '../../utils/formatVND';

interface IMovieData {
  id: number;
  image: string;
  name: string;
  title: string;
  total_revenue: string|number;
}

const StatisticTop1Movie = (props: Props) => {
  const {data}= useGetTop1MovieQuery()
  
  
  return (
    <div >
      <h1 className='text-2xl text-center p-4 '>Phim có doanh thu cao nhất</h1>
      <div className='rounded-md grid grid-cols-3 gap-4'>
        <div  className='col-span-2'>
          <h1 className='text-[#0D5D9F] text-2xl m-4'>{data?.data?.name}</h1>
          <p className='text-2xl m-4'><span>Tổng doanh thu:</span><span>{formatCurrency(data?.data?.total_revenue)
            }</span></p>
        </div>
        <img className='rounded-md col-span-1' src={data?.data?.image} alt="" />

      </div>
    </div>
  )
}

export default StatisticTop1Movie
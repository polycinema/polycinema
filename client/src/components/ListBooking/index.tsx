import React from 'react'

import { Button, Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllBookingsQuery } from '../../redux/api/checkoutApi';

interface DataType {
  key: string;
  id:string|number
  name: string;
  email: string;
  total: string | number;
}

const ListsBooking = () => {
  const {data:bookings} = useGetAllBookingsQuery()
  console.log(bookings);
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><Button danger>Delete</Button></a>
        </Space>
      ),
    },
  ];
  
  const dataTable: DataType[] =  bookings?.data?.map((item)=>{
    return {
          key: item?.id,
          id:item?.booking_id,
          name: item?.user?.name,
          email: item?.user?.email,
          total: item?.total_price          ,
    }
  }) 
  
  return (
    <>
    <h1 className='text-center text-xl py-4'>Danh sách đặt vé</h1>
    <Table columns={columns} dataSource={dataTable} pagination={false} />
    <Pagination
        style={{ marginTop: '16px', textAlign: 'center' }}
        defaultCurrent={1}
        total={dataTable?.length}
        pageSize={10}
        showSizeChanger
        showQuickJumper
      />
    </>
  )
}

export default ListsBooking
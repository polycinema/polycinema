import React from 'react'

import { Button, Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  id:string|number
  name: string;
  email: string;
  total: string | number;
}
type Props = {}

const ListsBooking = (props: Props) => {
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><Button danger>Delete</Button></a>
        </Space>
      ),
    },
  ];
  
  const dataTable: DataType[] = [
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
    {
      key: '1',
      id:"1",
      name: 'John Brown',
      email: "hiihihihi",
      total: '1000',
    },
  ];
  return (
    <>
    <h1 className='text-center text-xl py-4'>Danh sách đặt vé</h1>
    <Table columns={columns} dataSource={dataTable} pagination={false} />
    <Pagination
        style={{ marginTop: '16px', textAlign: 'center' }}
        defaultCurrent={1}
        total={dataTable.length}
        pageSize={10}
        showSizeChanger
        showQuickJumper
      />
    </>
  )
}

export default ListsBooking
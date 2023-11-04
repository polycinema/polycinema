import React, { useEffect, useState } from 'react'

import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import {  IRoom, getAllRoom, removeRoom } from '../../../api/room';

interface DataType {
        key: string;
        room_name:string
        capacity: number
}
const ListRooms = () => {
        const [rooms,setRooms] = useState<IRoom[]>()
        const [messageApi , contextHolder] = message.useMessage()



        useEffect(()=>{
                (
                        async()=>{
                                try {
                                        const {data} = await getAllRoom()
                                        setRooms(data.data);

                                } catch (error) {
                                        console.log(error);
                                }
                        }
                )()
        },[])






        const columns: ColumnsType<DataType> = [
                {
                        title: 'Name',
                        dataIndex: 'room_name',
                        key: 'room_name',
                        render: (text) => <a>{text}</a>,
                },
                {
                  title: 'Capacity',
                  dataIndex: 'capacity',
                  key: 'capacity',
                  render: (text) => <a>{text}</a>,
          },
                {
                        title: 'Action',
                        key: 'action',
                        render: ({key:id}:{key:number|string}) => (


                                <Space size="middle">


                                  <Button>
                                    <Link to={`/admin/rooms/${id}/edit`}>Edit</Link>
                                  </Button>
                                  <div>
                                    <Popconfirm
                                    title="Xóa sản phẩm"
                                    description="Bạn có chắc chắn muốn xóa sản phẩm"
                                    onConfirm={()=>{
                                      removeRoom(id).then(()=>{
                                        setRooms(rooms?.filter((item:IRoom)=> item.id !==id))
                                        messageApi.open({
                                          type:"success",
                                          content:"Xóa sản phẩm thành công"
                                        })
                                      })

                                    }}
                                    okText="Có"
                                    cancelText="Không"
                                    >
                                    <Button danger >
                                    Delete
                                  </Button>

                                    </Popconfirm>
                                  </div>


                                </Space>
                        ),
                },
        ];

        const dataConfig:DataType[] = rooms?.map((item) => {
                return {
                        key: item?.id,
                        room_name: item?.room_name,
                        capacity: item?.capacity,
                }
        })
        return (
                <>
                {contextHolder}
                <div>
                        <h1 className='text-2xl m-6 '>Danh sách phòng </h1>
                        <Table columns={columns}   />
                </div>
                </>

        )
}

export default ListRooms

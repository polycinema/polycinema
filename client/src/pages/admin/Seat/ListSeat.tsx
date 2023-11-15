import React, { useEffect, useState } from 'react'
import { Button,  Popconfirm,  Space,  Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { ISeat, getAllSeat, removeSeat } from '../../../api/Seat';


interface DataType {
   
    seat_name: string;
        type: string;
        room_id: number;
        price:number,
        showtime_id:number,

}
const ListSeat = (props: Props) => {
    const [seat, setSeat] = useState<ISeat[]>()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getAllSeat()
                    setSeat(data.data);
                  
                    

                } catch (error) {
                    console.log(error);

                }
            }
        )()

    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Seat name',
            dataIndex: 'seat_name',
            key: 'seat_name',

        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',

        },
        {
            title: 'User id',
            dataIndex: 'user_id',
            key: 'user_id',

        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',

        },
        {
            title: 'showtime_id',
            dataIndex: 'showtime_id',
            key: 'showtime_id',

        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',

        },
        {
            title: 'Action',
            key: 'action',
            render: ({ key: id }: { key: number | string }) => (
                <Space size="middle">
                    <Button>
                        <Link to={`/admin/seat/${id}/edit`}>Edit</Link>
                    </Button>
                    <div>
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa tin tức"
                            onConfirm={() => {
                                console.log(id);
                                
                                removeSeat(id).then(() => {
                                    setSeat(seat?.filter((item: ISeat) => item.id !== id))
                                    messageApi.open({
                                        type: "success",
                                        content: "Xóa ghế tức thành công"
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

    const data: DataType[] = seat?.map((item: ISeat) => {
        return {
           key:item.id,
            seat_name: item?.seat_name,
            type: item?.type,
            user_id:item?.user_id,
            price:item?.price,
            showtime_id:item?.showtime_id,
            status:item?.status,
         
           
        }
    })

    return (
        <>
            {contextHolder}
            <div>
                <Button>
                    <Link to={"/admin/seat/add"}>Thêm ghế</Link>
                </Button>
                <h1 className='text-2xl m-6 '>Danh sách ghế</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        </>

    )
}

export default ListSeat
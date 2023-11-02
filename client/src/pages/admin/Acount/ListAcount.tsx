import React, { useEffect, useState } from 'react'

import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CiPickerEmpty, CiTrash } from "react-icons/ci";
import { ICount, getAllAcount, removeAcount } from '../../../api/Acount';


interface DataType {
    key: string;
    name: string;
    email: string;
    role: string
}
const ListAcount = () => {
    const [acounts, setAcounts] = useState<ICount[]>()
    const [messageApi, contextHolder] = message.useMessage()
    console.log(acounts);
    

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getAllAcount()
                    setAcounts(data.data);

                } catch (error) {
                    console.log(error);
                }
            }
        )()

    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: ({ key: id }: { key: number | string }) => (
                <Space size="middle">
                    <Button>
                        <Link to={`/admin/acount/${id}/edit`}>Edit</Link>
                    </Button>
                    <div>
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa sản phẩm"
                            onConfirm={() => {
                                removeAcount(id).then(() => {
                                    setAcounts(acounts?.filter((item: ICount) => item.id !== id))
                                    messageApi.open({
                                        type: "success",
                                        content: "Xóa tài khoản thành công"
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

    const dataConfig: DataType[] = acounts?.map((item) => {
        return {
            key: item?.id,
            name: item?.name,
            email: item?.email,
            role: item?.role
        }
    })
    return (
        <>
            {contextHolder}
            <div>
                <h1 className='text-2xl m-6 '>Danh sách tài khoản</h1>
                <div>
                    <Button type="primary" danger>
                    <Link to={`/admin/addAcount`}>Thêm tài khoản</Link>
                    </Button>
                </div>


                <Table columns={columns} dataSource={dataConfig} />
            </div>
        </>

    )
}

export default ListAcount
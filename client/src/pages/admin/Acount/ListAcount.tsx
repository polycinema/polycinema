import React, { useEffect, useState } from 'react'

import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CiPickerEmpty, CiTrash } from "react-icons/ci";

interface DataType {
    key: string;
    name: string;
    email: string;
    password: string;
    role: string
}
const ListAcount = (props: Props) => {


    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',

        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',

        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Link to={""} className='text-xl'><CiPickerEmpty /></Link>
                    <Link to={""} className='text-xl'><CiTrash /></Link>

                </Space>
            ),
        },
    ];

    const data: DataType[] = [{
        key: "1",
        name: "item.name",
        email: "item.email",
        password: "item.password",
        role: "admin"
    }]

    return (
        <div>
            <h1 className='text-2xl m-6 '>Danh sách tài khoản</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default ListAcount
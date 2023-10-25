import React, { useEffect, useState } from 'react'

import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CiPickerEmpty,CiTrash } from "react-icons/ci";

interface DataType {
        key: string;
        name: string;
        imgae:string
        
}
const ListDirector = (props: Props) => {
       

        const columns: ColumnsType<DataType> = [
                {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        
                },
                {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: () =><img src="" alt="anh" />,
                },
                {
                        title: 'Action',
                        key: 'action',
                        render: () => (
                                <Space size="middle">
                                        <Link to={""} className='text-xl'><CiPickerEmpty/></Link>
                                        <Link to={""} className='text-xl'><CiTrash/></Link>

                                </Space>
                        ),
                },
        ];

        const data: DataType[] =[{
                        key:"1",
                        name:"item.name",
                        imgae:"image"
                }]
        
        return (
                <div>
                        <h1 className='text-2xl m-6 '>Danh sách đạo diễn</h1>
                        <Table columns={columns} dataSource={data} />
                </div>
        )
        }

export default ListDirector
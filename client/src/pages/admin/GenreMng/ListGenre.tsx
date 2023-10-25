import React, { useEffect, useState } from 'react'

import { Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { CiPickerEmpty,CiTrash } from "react-icons/ci";
import { IGenre, getGenre } from '../../../api/genre';
interface DataType {
        key: string;
        name: string;
        
}
const ListGenre = () => {
        const [genre,setGenre] =useState<IGenre[]>([]);
        useEffect(()=>{
                (async()=>{
                        const {data} = await getGenre()
                        setGenre(data.data);
                })()

        },[])

        const columns: ColumnsType<DataType> = [
                {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text) => <a>{text}</a>,
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

        const data: DataType[] =genre.map((item:IGenre)=>{
                return{
                        key:item.id,
                        name:item.name
                }
        })
        return (
                <div>
                        <h1 className='text-2xl m-6 '>Danh sách thể loại</h1>
                        <Table columns={columns} dataSource={data} />
                </div>
        )
}

export default ListGenre
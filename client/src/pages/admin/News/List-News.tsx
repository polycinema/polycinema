import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { INews, getAllNews, removeNews, } from '../../../api/News';


interface DataType {
    key: string;
    title: string;
    summary: string;
    description: string;
    image: string

}
const ListPost = (props: Props) => {
    const [news, setNews] = useState<INews[]>()
    const [messageApi, contextHolder] = message.useMessage()
    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getAllNews()
                    setNews(data.data);

                } catch (error) {
                    console.log(error);

                }
            }
        )()

    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Tiêu đề tin tức',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Tóm tắt',
            dataIndex: 'summary',
            key: 'summary',

        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',

        },
        {
            title: 'Ảnh tin tức',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <img className='w-40' src={img} alt="anh" />,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: ({ key: id }: { key: number | string }) => (
                <Space size="middle">
                    <Button>
                        <Link to={`/admin/news/${id}/edit`}>Edit</Link>
                    </Button>
                    <div>
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc chắn muốn xóa tin tức"
                            onConfirm={() => {
                                removeNews(id).then(() => {
                                    setNews(news?.filter((item: INews) => item.id !== id))
                                    messageApi.open({
                                        type: "success",
                                        content: "Xóa tin tức thành công"
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

    const data: DataType[] = news?.map((item: INews) => {
        return {
            key: item?.id,
            title: item?.title,
            summary: item?.summary,
            description: item?.description,
            image: item?.image
        }
    })

    return (
        <>
            {contextHolder}
            <div>
                <Button>
                    <Link to={"/admin/news/add"}>Thêm tin tức</Link>
                </Button>
                <h1 className='text-2xl m-6 '>Danh sách tin tức</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        </>

    )
}

export default ListPost
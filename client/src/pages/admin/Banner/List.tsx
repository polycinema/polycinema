import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IBanner, getAllBanner, removeBanner } from '../../../api/Banner';

interface DataType {
  key: string;
  name: string;
}


const ListBanner = (props: Props) => {
  const [banner, setBanner] = useState<IBanner[]>()
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await getAllBanner()
          setBanner(data.data);

        } catch (error) {
          console.log(error);

        }
      }
    )()

  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: "Ảnh banner",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/banner/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa banner"
              description="Bạn có chắc chắn muốn xóa banner"
              onConfirm={() => {
                removeBanner(id).then(() => {
                  setBanner(banner?.filter((item: IBanner) => item.id !== id))
                  messageApi.open({
                    type: "success",
                    content: "Xóa banner thành công"
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


  const data: DataType[] = banner?.map((item: IBanner) => {
    return {
      key: item?.id,
      image: item?.name,
    }
  })
  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/banner/add"}>Thêm banner</Link>
        </Button>
        <h1 className="text-2xl m-6 ">Danh sách ảnh banner</h1>
        <Table columns={columns}  dataSource={data}/>;
      </div>
    </>

  )
}

export default ListBanner

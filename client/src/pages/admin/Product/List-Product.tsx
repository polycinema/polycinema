import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { IProduct, getAllProduct, removeProduct } from '../../../api/Product';
interface DataType {
  key: string;
  name: string;
  image: string;
  price: number;
}


const ListProduct = (props: Props) => {
  const [product, setProduct] = useState<IProduct[]>()
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await getAllProduct()
          setProduct(data.data);

        } catch (error) {
          console.log(error);

        }
      }
    )()

  }, [])
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/products/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                removeProduct(id).then(() => {
                  setProduct(product?.filter((item: IProduct) => item.id !== id))
                  messageApi.open({
                    type: "success",
                    content: "Xóa sản phẩm thành công"
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


  const data: DataType[] = product?.map((item: IProduct) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
      price: item?.price,
      description: item?.description
    }
  })
  return (
    <>
      {contextHolder}
      <div>
        <Button>
          <Link to={"/admin/products/add"}>Thêm sản phẩm</Link>
        </Button>
        <h1 className="text-2xl m-6 ">Danh sách sản phẩm</h1>
        <Table columns={columns}  dataSource={data}/>;
      </div>
    </>

  )
}

export default ListProduct

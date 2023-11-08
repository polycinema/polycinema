import { Button, Popconfirm, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { Link } from 'react-router-dom'
interface DataType {
  key: string;
  name: string;
  image: string;
  price: number;
}


const ListProduct = () => {
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

              }}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];
  return (
    <div>
    <Button>
      <Link to={"/admin/products/add"}>Thêm sản phẩm</Link>
    </Button>
    <h1 className="text-2xl m-6 ">Danh sách sản phẩm</h1>
    <Table columns={columns}   />;
  </div>
  )
}

export default ListProduct

import React, { useState } from "react";
import { Badge, Button, Modal, Popconfirm, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

import {
  useGetAllProductsQuery,
  useGetAllSoftProductQuery,
  useSoftDeleteProductMutation,
} from "../../../redux/api/productApi";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { formatCurrency } from "../../../utils/formatVND";
interface DataType {
  key: string;
  name: string;
  image: string;
  price: number;
}

const ListProduct = () => {
  const { data: products } = useGetAllProductsQuery();
  const [softDelete] = useSoftDeleteProductMutation();
  const { data: productSoft } = useGetAllSoftProductQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      align: "center",
      key: "image",
      render: (img) => <img className="w-40 mx-auto" src={img} alt="anh" />,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      align: "center",
      render:(item)=> <p>{formatCurrency(item)}</p> 
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/products/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Ẩn sản phẩm"
              description="Bạn có chắc chắn muốn ẩn sản phẩm"
              onConfirm={() => {
                softDelete({ product_id: id }).then(() => {
                  messageApi.open({
                    type: "success",
                    content: "Ẩn sản phẩm thành công",
                  });
                });
              }}
              okType="default"
              okText="Có"
              cancelText="Không"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const data: DataType[] = products?.data?.map((item: IProduct) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
      price: item?.price,
      description: item?.description,
    };
  });

  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const dataSource = productSoft?.data?.map((item) => {
    return {
      key: item.id,
      name: item?.name,
      image: item?.image,
      price: item?.price,
      description: item?.description,
    };
  });
  const columnBanned = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      key: "price",
      render:(item)=> <p>{formatCurrency(item)}</p> 
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      render: (_: any, { key: id }: any) => (
        <div className="space-x-3">
          <Popconfirm
            title="Bỏ ẩn sản phẩm"
            description="Bạn có chắc muốn khôi phục?"
            okText="Yes"
            okType="default"
            cancelText="No"
            onConfirm={() =>
              softDelete({ product_id: id })
                .unwrap()
                .then(() => {
                  swal(
                    "Thành công!",
                    "Bỏ ẩn thành công!",
                    "success"
                  );
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Bỏ ẩn  thất bại , Vui lòng thử lại !",
                    "error"
                  );
                })
            }
            
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div>
        <div className="flex justify-between items-center">
          <Button>
            <Link to={"/admin/products/add"}>Thêm sản phẩm</Link>
          </Button>
          <div>
            <Badge count={productSoft?.data?.length} size="small">
              <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                Sản phẩm đã bị ẩn
              </Button>
            </Badge>
            <Modal
              title="Danh sách sản phẩm ẩn"
              open={isModalOpenGarbage}
              width={1000}
              bodyStyle={{ maxHeight: "800px", overflow: "auto" }}
              onCancel={handleCancelGarbage}
              footer={null}
            >
              <Table dataSource={dataSource} columns={columnBanned} />
            </Modal>
          </div>
        </div>
        <h1 className="text-2xl my-6 bg-white text-[#0D5D9F] p-4 rounded-md shadow-md ">
          Danh sách sản phẩm
        </h1>
        <Table
          columns={columns}
          dataSource={data}
          className="bg-white p-4 rounded-md shadow-md"
        />
        ;
      </div>
    </>
  );
};

export default ListProduct;

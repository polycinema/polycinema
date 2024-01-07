import { Button, Popconfirm, Space, Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCouponMutation,
  useGetAllCouponQuery,
} from "../../../redux/api/couponApi";
import IsLoading from "../../../utils/IsLoading";
import { formatCurrency } from "../../../utils/formatVND";
type FieldType = {
  coupon_code?: string;
  description?: string;
  type?: string;
  discount?: string | number;
  expires_at?: string;
  quantity?: number | string;
};
const CouponMng = (props: Props) => {
  const { data: coupon, isLoading } = useGetAllCouponQuery();
  const [deleteCoupon] = useDeleteCouponMutation();
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "coupon_code",
      key: "coupon_code",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại mã giảm",
      dataIndex: "type",
      key: "type",
      render: (type: any) =>
        type === "discount_percentage"
          ? "Giảm theo phần trăm"
          : "Giảm theo giá tiền",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expires_at",
      key: "expires_at",
      render: (expires_at: any) => dayjs(expires_at).format("DD-MM-YYYY"),
    },
    {
      title: "Giá trị mã giảm",
      dataIndex: "discount",
      key: "discount",
      
    },
    {
      title: "Giá trị đơn hàng tối thiếu",
      dataIndex: "min_order_value",
      key: "min_order_value",
      render: (min_order_value: any) => formatCurrency(min_order_value),

    },
    {
      title: "Số lượng mã giảm",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/coupon/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa mã giảm"
              description="Bạn có chắc chắn muốn xóa mã giảm"
              onConfirm={() => {
                deleteCoupon(id)
                  .unwrap()
                  .then(() => {
                    message.open({
                      type: "success",
                      content: "Xóa mã giảm thành công",
                    });
                  });
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

  const dataSource = coupon?.data?.map((item) => {
    return {
      key: item.id,
      coupon_code: item.coupon_code,
      description: item.description,
      type: item.type,
      discount: item.discount,
      min_order_value: item.min_order_value,
      expires_at: item.expires_at,
      quantity: item.quantity,
    };
  });

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div>
          <Button className="m-2">
            <Link to={"/admin/coupon/add"}>Thêm mã giảm</Link>
          </Button>
          <h1 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">
            Danh sách mã giảm
          </h1>
          <Table dataSource={dataSource} columns={columns} className="bg-white p-4 rounded-md shadow-md" />
        </div>
      )}
    </>
  );
};

export default CouponMng;

import { Badge, Button, Modal, Popconfirm, Space, Table, message } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  useGetAllCouponQuery,
  useGetSoftCouponQuery,
  useSoftDeleteCouponMutation,
} from "../../../redux/api/couponApi";
import IsLoading from "../../../utils/IsLoading";
import { formatCurrency } from "../../../utils/formatVND";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { MdAutoDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FcDeleteDatabase } from "react-icons/fc";
import { FaTrashRestore } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

type FieldType = {
  coupon_code?: string;
  description?: string;
  type?: string;
  discount?: string | number;
  expires_at?: string;
  quantity?: number | string;
};
const CouponMng = () => {
  const { data: coupon, isLoading } = useGetAllCouponQuery();
  const [deleteCoupon] = useSoftDeleteCouponMutation();
  const [restoreCoupon] = useSoftDeleteCouponMutation();
  const { data: softCoupon, error: errSoftCoupons } = useGetSoftCouponQuery();
  const [softCoupons, setSoftCoupons] = useState([]);
  const [CountSoftCoupons, setCountSoftCoupons] = useState(0);
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  useEffect(() => {
    if (softCoupons) {
      setCountSoftCoupons(softCoupons.length);
    }
  }, [softCoupons]);
  useEffect(() => {
    if (softCoupon) {
      setSoftCoupons(softCoupon.data);
    }
  }, [softCoupon]);
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "coupon_code",
      key: "coupon_code",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Loại mã giảm",
      dataIndex: "type",
      align: "center",
      key: "type",
      render: (type: any) =>
        type === "discount_percentage"
          ? "Giảm theo phần trăm"
          : "Giảm theo giá tiền",
          filters: [
            {
              text: "Giảm theo phần trăm",
              value: "discount_percentage",
            },
            {
              text: "Giảm theo giá tiền",
              value: "discount_amount",
            }
          ],
          onFilter: (value: string, record) => record.type.indexOf(value) === 0,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_at",
      key: "start_at",
      align: "center",
      render: (start_at: any) => dayjs(start_at).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expires_at",
      key: "expires_at",
      align: "center",
      render: (expires_at: any) => dayjs(expires_at).format("DD-MM-YYYY"),
    },
    {
      title: "Giá trị mã giảm",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "Giá trị đơn hàng tối thiếu",
      dataIndex: "min_order_value",
      key: "min_order_value",
      align: "center",
      render: (min_order_value: any) => formatCurrency(min_order_value),
    },
    {
      title: "Số lượng mã giảm",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },

    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/coupon/${id}/edit`}>
            <Button icon={<MdEdit />} />
          </Link>
          <div>
            <Popconfirm
              title="Xóa mã giảm"
              description="Bạn có chắc chắn muốn xóa mã giảm"
              onConfirm={() => {
                deleteCoupon({ coupon_id: id })
                  .unwrap()
                  .then(() => {
                    swal("Thành công!", "Xóa voucher thành công!", "success");
                  })
                  .catch(() => {
                    swal("Thất bại!", "Xóa voucher thất bại!", "error");
                  });
              }}
              okText="Có"
              cancelText="Không"
              okType="default"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];
  const columnsSoftCoupon = [
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
      title: "Ngày bắt đầu",
      dataIndex: "start_at",
      key: "start_at",
      align: "center",
      render: (start_at: any) => dayjs(start_at).format("DD-MM-YYYY"),
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
      title: "Số lượng ",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục voucher"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreCoupon({ coupon_id: id })
                .unwrap()
                .then(() => {
                  swal(
                    "Thành công!",
                    "Khôi phục voucher thành công!",
                    "success"
                  );
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Khôi phục voucher thất bại , Vui lòng thử lại !",
                    "error"
                  );
                })
            }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const dataSourceSoftCoupon = softCoupons?.map((item: ICoupon) => {
    return {
      key: item.id,
      coupon_code: item.coupon_code,
      description: item.description,
      type: item.type,
      discount: item.discount,
      min_order_value: item.min_order_value,
      expires_at: item.expires_at,
      start_at: item.start_at,
      quantity: item.quantity,
    };
  });
  const dataSource = coupon?.data?.map((item: ICoupon) => {
    return {
      key: item.id,
      coupon_code: item.coupon_code,
      description: item.description,
      type: item.type,
      discount: item.discount,
      min_order_value: item.min_order_value,
      expires_at: item.expires_at,
      start_at: item.start_at,
      quantity: item.quantity,
    };
  });
  if (errSoftCoupons) {
    console.error("errSoftCoupons:", errSoftCoupons);
  }
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div>
          <div className="md:flex justify-between items-center">
            <Link to={"/admin/coupon/add"}>
              <Button className="m-2">Thêm mã giảm</Button>
            </Link>
            <div className="">
              <Badge count={CountSoftCoupons} size="small">
                <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                  Thùng rác
                </Button>
              </Badge>
              <Modal
                title="Thùng rác"
                open={isModalOpenGarbage}
                onCancel={handleCancelGarbage}
                footer={null}
                width={1100}
              >
                <Table
                  dataSource={dataSourceSoftCoupon}
                  columns={columnsSoftCoupon}
                />
              </Modal>
            </div>
          </div>
          <h1 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md text-[#0D5D9F]">
            Danh sách mã giảm
          </h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            className="bg-white p-4 rounded-md shadow-md"
          />
        </div>
      )}
    </>
  );
};

export default CouponMng;
export interface RootCoupon {
  data: ICoupon[];
}

export interface ICoupon {
  id: number;
  coupon_code: string;
  description: string;
  type: string;
  discount: number;
  expires_at: string;
  start_at: string;
  quantity: number;
  min_order_value: any;
  level: string;
  created_at: any;
  updated_at: string;
}

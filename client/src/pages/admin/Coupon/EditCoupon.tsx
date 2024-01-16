import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEditCouponMutation,
  useGetCouponByIDQuery,
} from "../../../redux/api/couponApi";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
type FieldType = {
  coupon_code?: string;
  description?: string;
  type?: string;
  discount?: string | number;
  expires_at?: string;
  start_at?:string;
  quantity?: number | string;
  min_order_value:number|string;

};

const EditCoupon = () => {
  const { id } = useParams();
  const { data: coupon } = useGetCouponByIDQuery(id || "");
  const [update, { isLoading: isUpdateLoading }] = useEditCouponMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    setFields();
  }, [coupon]);
  const setFields = () => {
    form.setFieldsValue({
      id: coupon?.data.id,
      coupon_code: coupon?.data.coupon_code,
      description: coupon?.data.description,
      type: coupon?.data?.type,
      discount: coupon?.data?.discount,
      quantity: coupon?.data.quantity,
      min_order_value:coupon?.data?.min_order_value,
      expires_at: dayjs(coupon?.data.expires_at, "YYYY/MM/DD"),
      start_at: dayjs(coupon?.data.start_at, "YYYY/MM/DD"),
    });
  };
  const onFinish = (value: any) => {
    update({
      id,
      ...value,
      expires_at: dayjs(value.expires_at).format("YYYY/MM/DD"),
      start_at: dayjs(value.start_at).format("YYYY/MM/DD"),
    })
      .unwrap()
      .then(async() => {
        form.resetFields()
        await swal("Thành công!", "Cập nhật mã giảm thành công!", "success");
        navigate("/admin/coupon");
  
      })
      .catch(()=>{
        swal("Thất bại!", "Cập nhật mã giảm thất bại , Vui lòng thử lại !", "error");
      })
  };
  return (
    <div>
      <h1 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Cập nhật mã giảm giá</h1>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off" 
        className="bg-white p-4 rounded-md shadow-md"
      >
        <Form.Item<FieldType>
          label="Tên mã giảm"
          name="coupon_code"
          rules={[
            { required: true, message: "Please input your coupon_code!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item<FieldType>
          label="Kiểu mã giảm"
          name="type"
          rules={[{ required: true, message: "Please input your type!" }]}
        >
          <Select
            placeholder="Chọn kiểu mã giảm"
            style={{ width: "100%" }}
            options={[
              { value: "discount_percentage", label: "Giảm theo phần trăm" },
              { value: "discount_amount", label: "Giảm theo giá trị" },
            ]}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giá trị mã giảm"
          name="discount"
          rules={[
            { required: true, message: "Please input your discount_amount!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="0" min={0} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Ngày bắt đầu"
          name="start_at"
          rules={[{ required: true, message: "Please input your start_at!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Ngày hết hạn"
          name="expires_at"
          rules={[{ required: true, message: "Please input your expires_at!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số lượng mã giảm"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="0" min={0} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giá trị đơn hàng tối thiểu"
          name="min_order_value"
          rules={[{ required: true, message: 'Please input your discount_amount!' }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder='0' min={0} />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button htmlType="submit">
            {isUpdateLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <VerticalAlignTopOutlined />
            )}{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCoupon;

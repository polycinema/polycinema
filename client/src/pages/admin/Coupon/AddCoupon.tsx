import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useAddCouponMutation } from '../../../redux/api/couponApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
type FieldType = {
  coupon_code?: string;
  description?: string;
  type?: string;
  discount?: string | number;
  expires_at?: string;
  quantity?: number | string
};

const AddCoupon = () => {
  const [form] = Form.useForm()
  const [addCoupon, { isLoading }] = useAddCouponMutation()
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addCoupon({ ...values, expires_at: dayjs(values.expires_at).format('YYYY/MM/DD') }).unwrap()
    .then(async() => {
      form.resetFields()
      await swal("Thành công!", "Thêm mã giảm thành công!", "success");
      navigate("/admin/coupon");

    })
    .catch(()=>{
      swal("Thất bại!", "Thêm mã giảm thất bại , Vui lòng thử lại !", "error");
    })
  };

  return (
    <div>
      <h1 className="text-xl uppercase font-bold mb-4">Thêm mã giảm giá</h1>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Tên mã giảm"
          name="coupon_code"
          rules={[{ required: true, message: 'Please input your coupon_code!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item<FieldType>
          label="Kiểu mã giảm"
          name="type"
          rules={[{ required: true, message: 'Please input your type!' }]}
        >

          <Select
            placeholder="Chọn kiểu mã giảm"
            style={{ width: "100%" }}
            options={[
              { value: 'discount_percentage', label: 'Giảm theo phần trăm' },
              { value: 'discount_amount', label: 'Giảm theo giá trị' },

            ]}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giá trị mã giảm"
          name="discount"
          rules={[{ required: true, message: 'Please input your discount_amount!' }]}
        >

          <InputNumber style={{ width: "100%" }} placeholder='0' min={0} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Ngày hết hạn"
          name="expires_at"
          rules={[{ required: true, message: 'Please input your expires_at!' }]}
        >

          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số lượng mã giảm"
          name="quantity"
          rules={[{ required: true, message: 'Please input your quantity!' }]}
        >

          <InputNumber style={{ width: "100%" }} placeholder='0' min={0} />
        </Form.Item>



        <Form.Item label="Tác vụ">
          <Button htmlType="submit">
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <VerticalAlignTopOutlined />
            )}{" "}

          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCoupon
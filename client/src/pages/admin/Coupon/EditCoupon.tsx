import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEditCouponMutation, useGetCouponByIDQuery } from '../../../redux/api/couponApi'
import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { pause } from '../../../utils/pause';
type FieldType = {
  coupon_code?: string;
  description?: string;
  type?: string;
  discount?:string|number;
  expires_at?:string;
  quantity?:number|string
};

const EditCoupon = () => {
  const { id } = useParams()
  const { data: coupon } = useGetCouponByIDQuery(id || "")
  const [update, { isLoading: isUpdateLoading }] = useEditCouponMutation()
  const [form] = Form.useForm()
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
        expires_at: dayjs(coupon?.data.expires_at, "YYYY/MM/DD")

    });
};
const onFinish = (value:any) => {
  
      update({id,...value,expires_at:dayjs(value.expires_at).format('YYYY/MM/DD')}).unwrap()
          .then(async () => {
              form.resetFields()
              message.open({
                  type: "success",
                  content: "Thêm mã giảm thành công . Chuyển trang sau 3s"
              });
              navigate("/admin/coupon");


          })
          .catch(() => {
              message.open({
                  type: "error",
                  content: "Thêm sản phẩm thất bại vui lòng thử lại"
              })
          })

}
  return (
    <div>
      <h1 className="text-xl uppercase font-bold mb-4">Thêm mã giảm giá</h1>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
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
          <TextArea/>
        </Form.Item>
        <Form.Item<FieldType>
          label="Kiểu mã giảm"
          name="type"
          rules={[{ required: true, message: 'Please input your type!' }]}
        >
          
    <Select
    placeholder="Chọn kiểu mã giảm"
      style={{ width: 120 }}
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
          
        <InputNumber placeholder='0' min={0}/>
        </Form.Item>
        <Form.Item<FieldType>
          label="Ngày hết hạn"
          name="expires_at"
          rules={[{ required: true, message: 'Please input your expires_at!' }]}
        >
          
        <DatePicker />
        </Form.Item>
        <Form.Item<FieldType>
          label="Số lượng mã giảm"
          name="quantity"
          rules={[{ required: true, message: 'Please input your quantity!' }]}
        >
          
        <InputNumber placeholder='0' min={0}/>
        </Form.Item>

        

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button  htmlType="submit">
          {isUpdateLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Cập nhật mã giảm"
              )}{" "}
            
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditCoupon
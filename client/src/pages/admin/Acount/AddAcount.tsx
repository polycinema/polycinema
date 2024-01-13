import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from 'sweetalert';
import { useAddAcountMutation } from "../../../redux/api/acountApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type FieldType = {
  name: string;
  email: string;
  password: string;
};

const AddAcount = () => {
  const [addAcount, {isLoading}] = useAddAcountMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addAcount(values)
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm tài khoản thành công!", "success");
        navigate("/admin/acountUser");
      })
      .catch(() => {
        swal("Thất bại!", "Tài khoản đã tồn tại , Vui lòng thử lại !", "error");
      });
  };

  return (
    <>
      <div >
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Thêm tài khoản</h1>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item<FieldType>
            label="Tên người dùng"
            name="name"
            rules={[
              { required: true, message: "Tên tài khoản không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Tác vụ :">
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
    </>
  );
};

export default AddAcount;

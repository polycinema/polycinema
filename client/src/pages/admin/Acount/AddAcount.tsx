import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { addAcount } from "../../../api/Acount";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from 'sweetalert';
type FieldType = {
  name: string;
  email: string;
  password: string;
};

const AddAcount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addAcount(values)
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm tài khoản thành công!", "success");
        navigate("/admin/acount");
      })
      .catch(() => {
        swal("Thất bại!", "Tài khoản đã tồn tại , Vui lòng thử lại !", "error");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
          onFinishFailed={onFinishFailed}
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
              <VerticalAlignTopOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddAcount;

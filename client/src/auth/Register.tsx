import { Button, Form, Input, Space, notification } from "antd";
import { LoadingOutlined, LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useRegisterMutation } from "../redux/api/authApi";
import { useEffect } from "react";
import { IAuth } from "../interfaces/auth";

const Register = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  useEffect(() => {
    console.error("error register: ", error);
  }, [error]);
  const onFinish = (values: IAuth) => {
    register(values)
      .unwrap()
      .then(() => {
        notification.success({ message: "Register is successly!" });
      });
    // console.log(values);
  };
  return (
    <div className="max-w-2xl mx-auto my-20">
      <Form
        layout="vertical"
        labelCol={{ span: 20 }}
        // style={{ padding: 10 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="User name"
          name={"name"}
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User name"/>
        </Form.Item>
        <Form.Item
          label="Email"
          name={"mail"}
          rules={[
            { required: true, message: "Vui lòng nhập Email" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email"/>
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            { required: true, message: "Vui lòng nhập password" },
            { min: 6, message: "Password tối thiểu 6 kí tự" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password"/>
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name={"confirmPassword"}
          rules={[
            { required: true, message: "Vui lòng nhập confirm password" },
            ({ getFieldValue }) => ({
              validator(_, values) {
                if (!values || getFieldValue("password") === values) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error("Password không khớp"));
                }
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm password"/>
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button htmlType="submit">{isLoading ? <LoadingOutlined /> : 'Register'}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

import { Button, Form, Input, Space, notification } from "antd";
import {
  LoadingOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRegisterMutation } from "../redux/api/authApi";
import { useEffect, useState } from "react";
import { IAuth } from "../interfaces/auth";
import swal from "sweetalert";
import { useAppDispatch } from "../store/hook";
import { setActiveKeyAccount } from "../redux/slices/accountSlice";
const Register = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [errRegister, serErrRegister] = useState<any>();
  const dispatch = useAppDispatch();
  // console.log("errRegister: ", errRegister);
  useEffect(() => {
    if (error) {
      serErrRegister(error.data.errors.email[0]);
    }
  }, [error]);
  const onFinish = (values: IAuth) => {
    register(values)
      .unwrap()
      .then(() => {
        swal("Đăng kí thành công!", "Vui lòng đăng nhập!", "success");
      })
      .then(() => dispatch(setActiveKeyAccount("1")))
      .catch(() => swal("Đăng kí thất bại!", `${errRegister}`, "error"));
    // console.log(values);
  };
  if (error) {
    console.error("error register: ", error);
  }
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="User name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            { required: true, message: "Vui lòng nhập Email" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            { required: true, message: "Vui lòng nhập password" },
            { min: 8, message: "Password tối thiểu 8 kí tự" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm password"
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button htmlType="submit">
              {isLoading ? <LoadingOutlined /> : "Register"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

import { Button, Checkbox, Form, Input, Space, notification } from "antd";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useLoginMutation } from "../redux/api/authApi";
import { IAuth } from "../interfaces/auth";

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  console.error('error login: ',error)
  const onFinish = (values: IAuth) => {
    login(values)
      .unwrap()
      .then(() => {
        notification.success({ message: "Login is successly!" });
      });
  };
  return (
    <div className="max-w-2xl mx-auto my-20">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Email không đúng định dạng" },
          ]}
        >
          <Input
            prefix={<AiOutlineMail className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Checkbox>Remember me</Checkbox>
            <Link className="login-form-forgot text-blue-500">
              Forgot password
            </Link>
          </Space>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit">{isLoading ? <LoadingOutlined /> : 'Login'}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

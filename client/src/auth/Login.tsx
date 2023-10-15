import { Button, Checkbox, Form, Input, Space } from "antd";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { LockOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const Login = () => {
  const onFinish = (values: any) => {
    console.log(values);
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
            <Button htmlType="submit">Login</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

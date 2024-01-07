import { Button, Form, Input, Space, message, notification } from "antd";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useResetPaswordMutation } from "../redux/api/authApi";

const ResetPassword = () => {
        const [resetPassword, {isLoading}] = useResetPaswordMutation()
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const onFinish = (values:{email:string}) => {
        console.log({...values,token});
        
    resetPassword({...values,token})
      .unwrap()
      .then(()=>{
        message.success("Thay đổi mật khẩu thành công ")
      })
      .then(() => navigate("/poly-acount"))
      .catch(()=>{
        message.error("Thay đổi mật khẩu thất bại vui lòng thủ lại ")

      })
  };
  return (
    <div className="max-w-xl mx-auto py-20">
        <h1 className="text-4xl p-2">Thay đổi mật khẩu</h1>
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
          rules={[
            { min: 6, required: true, message: "Please input your Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name={"password_confirmation"}
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
          <Space>
            <Button htmlType="submit">
              {isLoading ? <LoadingOutlined /> : "Reset Password"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;

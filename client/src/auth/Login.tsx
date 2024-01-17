import { Button, Checkbox, Form, Input, Modal, Space, notification } from "antd";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { useForgotPaswordMutation, useLoginMutation } from "../redux/api/authApi";
import { IAuth } from "../interfaces/auth";
import { useEffect, useState } from "react";
import { setIsAuth, setToken, setUser } from "../redux/slices/authorizationSlice";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router";

const Login = () => {
  const [login, { isLoading, error }]: any = useLoginMutation();
  const [forgotPassword, {isLoading:isLoadingForgot}]: any = useForgotPaswordMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      return notification.error({
        message: error?.data,
      });
    }
  }, [error]);
  const onFinish = (values: IAuth) => {
    login(values)
      .unwrap()
      .then((auth: any) => {
        if (auth) {
          dispatch(setIsAuth())
          dispatch(setUser(auth.user))
          dispatch(setToken(auth.token))
        }
        notification.success({ message: "Đăng nhập thành công!" });
      })
      .then(() => navigate('/'))
      .catch(()=>{
        notification.error({ message: "Đăng nhập thất bại! . Vui lòng kiểm tra lại tài khoản" });
      })
  };
  const onFinishForgotPassword = (value:{email:string})=>{
    forgotPassword(value)
    .unwrap()
    .then(()=>{
          setIsModalOpen(false)
    })
    .catch((err:any)=>{
    console.log(err);
    
    })
    
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
          label="Mật khẩu"
          name="password"
          rules={[{ min: 6, required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>

            <Button onClick={showModal} className="login-form-forgot text-blue-500">Quên mật khẩu?</Button>
          </Space>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button htmlType="submit" >
              {isLoading ? <LoadingOutlined /> : "Đăng nhập"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Modal 
      title="LẤY LẠI MẬT KHẨU" 
      open={isModalOpen}
      onCancel={handleCancel}
      bodyStyle={{ height: '200px', overflow: 'auto' }}
      >
      <Form
        name=""
        className="forgot-form"
        initialValues={{ remember: true }}
        onFinish={onFinishForgotPassword}
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
        <Form.Item>
          <div className="flex justify-center">
          <Button htmlType="submit">
          {isLoadingForgot ? <LoadingOutlined /> : "Lấy lại mật khẩu"}</Button>
          </div>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;

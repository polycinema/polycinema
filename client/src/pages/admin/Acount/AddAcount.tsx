import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router';
import { pause } from '../../../utils/pause';
import { addAcount } from '../../../api/Acount';
import { Select } from 'antd';


type FieldType = {
    name: string;
    email: string;
    password: string;
};

const AddAcount = () => {

    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();

    const onFinish = (values) => {
        addAcount(values)
            .then(async () => {
                form.resetFields()
                messageApi.open({
                    type: "success",
                    content: "Thêm tài khoản thành công , Chuyển trang sau 3s"
                })
                await pause(3000)
                navigate("/admin/acount")
            })
            .catch((err) => {
                console.log(err);

            })


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <div>
                <h1 className='text-4xl m-6'>Thêm tài khoản</h1>
                <Form

                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên người dùng"
                        name="name"
                        rules={[{ required: true, message: 'Tên tài khoản không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Email không được để trống' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Password không được để trống' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                        label="Tác vụ :"

                    >

                        <Button
                            htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>

    )
}

export default AddAcount
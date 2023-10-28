import React from 'react'
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type FieldType = {
  name: string;
  email:string;
  password:string;
  role: string
};

type Props = {}

const EditAcount = (props: Props) => {
        const onFinish = async (values) => {
                console.log(values);
        };

        const onFinishFailed = (errorInfo: any) => {
                console.log('Failed:', errorInfo);
        };
        
        const onChange = (info) => {
                console.log(info);  
        }
  return (
        <div>
                <h1 className='text-4xl m-6'>Câp nhật tài khoản</h1>
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
                                label="Tên tài khoản"
                                name="name"
                        >
                                <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                                label="Email"
                                name="email"
                        >
                                <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                                label="Password"
                                name="password"
                        >
                                <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                                label="Role"
                                name="role"
                                va
                        >
                                <Input />
                        </Form.Item>
                        <Form.Item
                                wrapperCol={{ offset: 8, span: 16 }}
                                label="Tác vụ :"
                        >

                                <Button
                                        htmlType="submit">
                                        Sửa
                                </Button>
                        </Form.Item>
                </Form>
        </div>

  )
}

export default EditAcount
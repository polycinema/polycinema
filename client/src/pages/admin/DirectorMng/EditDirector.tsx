import React from 'react'
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



type FieldType = {
        name: string;
        image:string

};
type Props = {}

const EditDirector = (props: Props) => {
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
                <h1 className='text-4xl m-6'>Câp nhật Đạo Diễn</h1>
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
                                label="Tên đạo diễn"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                                <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                                label="Ảnh đạo diễn"
                                name="image"
                                rules={[{ required: true, message: "Please input your image!" }]}
                        >
                                <Upload >
                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>

                        </Form.Item>



                        <Form.Item
                                wrapperCol={{ offset: 8, span: 16 }}
                                label="Tác vụ :"
                        >

                                <Button
                                        htmlType="submit">
                                        Thêm Đạo Diễn
                                </Button>
                        </Form.Item>
                </Form>
        </div>

  )
}

export default EditDirector
import React from 'react'
import { Button, Form, Input } from 'antd';
import { IGenre, addGenre } from '../../../api/genre';
type FieldType = {
        name?: string;
        
};

const AddGenre = () => {
        const onFinish =async (values:IGenre) => {
                try {
                        await addGenre(values)
                } catch (error) {
                        console.log(error);
                        
                }
                
        };

        const onFinishFailed = (errorInfo:any) => {
                console.log('Failed:', errorInfo);
        };
        return (
                <div>
                        <h1 className='text-4xl m-6'>Thêm thể loại phim</h1>
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
                                        label="Tên thể loại"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your genre!' }]}
                                >
                                        <Input />
                                </Form.Item>

                                

                                <Form.Item 
                                wrapperCol={{ offset: 8, span: 16 }}
                                label="Tác vụ :"
                                
                                >

                                        <Button 
                                        htmlType="submit">
                                                Thêm thể loại
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        )
}

export default AddGenre
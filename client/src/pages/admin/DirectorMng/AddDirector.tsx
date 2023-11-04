import React, { useState } from 'react'
import { Button, Form, Input, Upload, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IDirector, addDirector } from '../../../api/director';
import { useNavigate } from 'react-router';
import { pause } from '../../../utils/pause';



type FieldType = {
        name: string;
        image: string

};
const AddDirector = () => {
        const [form] = Form.useForm()
        const [messageApi, contextHolder] = message.useMessage()
        const navigate = useNavigate();
        const [urlImage, setUrlImage] = useState("")
        const onFinish = async (value: IDirector) => {


                addDirector({ ...value, image: urlImage })
                        .then(async () => {
                                form.resetFields()
                                messageApi.open({
                                        type: "success",
                                        content: "Thêm diễn viên thành công , Chuyển trang sau 3s"
                                })
                                await pause(3000)
                                navigate("/admin/director")
                        })
                        .catch((err) => {
                                console.log(err.message);

                        })



        };

        const onFinishFailed = (errorInfo: any) => {
                console.log('Failed:', errorInfo);
        };

        const props: UploadProps = {
                name: 'file',
                action: 'https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload',
                // Thay đổi thành URL API của Cloudinary
                headers: {
                        // Authorization: 'Bearer 773215578244178',
                        // "Access-Control-Allow-Origin":"*"
                        // Thay đổi thành API key của bạn
                },
                data: {
                        // Thêm các dữ liệu cần thiết như upload preset
                        upload_preset: 'upload',
                        // Thay đổi thành upload preset của bạn
                },
                onChange(info) {
                        if (info.file.status !== 'uploading') {

                                console.log(info.file, info.fileList);


                        }
                        if (info.file.status === 'done') {
                                setUrlImage(info.file.response.url)
                                message.open({
                                        type: 'success',
                                        content: "Upload ảnh thành công"
                                })
                        } else if (info.file.status === 'error') {
                                message.error(`${info.file.name} file upload failed.`);
                        }
                },
        };

        return (
                <>
                        {contextHolder}

                        <div>
                                <h1 className='text-4xl m-6'>Thêm Đạo Diễn</h1>
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
                                                <Upload {...props}>
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
                </>
        )
}

export default AddDirector
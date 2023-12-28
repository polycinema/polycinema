import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Upload, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { INews, getNewsById, updateNews } from '../../../api/News';
import { pause } from '../../../utils/pause';
import TextArea from 'antd/es/input/TextArea';



type FieldType = {
    title: string;
    summary: string;
    description: string;
    image: string
};


const EditNews = () => {
    const {id} = useParams()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const [news, setNew] = useState<INews>()
    const [urlImage, setUrlImage] = useState<string>()

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getNewsById(id)
                    setNew(data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [])
    useEffect(() => {
        setFields();
    }, [news]);
    const setFields = () => {
        form.setFieldsValue({
            id: news?.id,
            title: news?.title,
            summary: news?.summary,
            description: news?.description,
            image: news?.image
        });
    };


    const onFinish = async (value: INews) => {
        urlImage === undefined ?
            updateNews({ id: id, ...value })
                .then(async () => {
                    form.resetFields()
                    messageApi.open({
                        type: "success",
                        content: "Sửa tin tức thành công , Chuyển trang sau 1s"
                    })
                    await pause(1000)
                    navigate("/admin/news")
                })
                .catch((err) => {
                    console.log(err.message);

                }) : updateNews({ id: id, ...value, image: urlImage })
                    .then(async () => {
                        form.resetFields()
                        messageApi.open({
                            type: "success",
                            content: "Sửa tin tức thành công  , Chuyển trang sau 1s"
                        })
                        await pause(1000)
                        navigate("/admin/news")
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
            <div >
                <h1 className='text-4xl m-6'>Câp nhật Tin Tức</h1>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2 p-4'>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='mx-5'
                    >
                        <Form.Item<FieldType>
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Tóm tắt "
                            name="summary"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item<FieldType>
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                             <TextArea rows={5} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Ảnh tin tức"
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
                                Cập nhật tin tức
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                    <div className='col-span-1  p-4'>
                        <h4 className='mb-2 text-xl'>Ảnh đạo diễn</h4>
                        <img className='w-72 rounded-sm' src={news?.image} alt="anh" />

                    </div>
                </div>

            </div>
        </>

    )
}

export default EditNews

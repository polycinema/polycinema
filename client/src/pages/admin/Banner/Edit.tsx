import React, { useEffect, useState } from 'react'
import { Button, Form, Upload, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';
import { pause } from '../../../utils/pause';
import { IBanner, getBannerById, updateBanner } from '../../../api/Banner';

type FieldType = {
    name: string;

};

const EditBanner = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const [banner, setBanner] = useState<IBanner>()
    const [urlImage, setUrlImage] = useState<string>()

    useEffect(() => {
        (
            async () => {
                try {
                    const { data } = await getBannerById(id)
                    setBanner(data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [])
    useEffect(() => {
        setFields();
    }, [banner]);
    const setFields = () => {
        form.setFieldsValue({
            id: banner?.id,
            image: banner?.name,

        });
    };


    const onFinish = async (value: IBanner) => {
        urlImage === undefined ?
            updateBanner({ id: id, ...value })
                .then(async () => {
                    form.resetFields()
                    messageApi.open({
                        type: "success",
                        content: "Sửa banner thành công , Chuyển trang sau 1s"
                    })
                    await pause(1000)
                    navigate("/admin/products")
                })
                .catch((err) => {
                    console.log(err.message);

                }) : updateBanner({ id: id, ...value, name: urlImage })
                    .then(async () => {
                        form.resetFields()
                        messageApi.open({
                            type: "success",
                            content: "Sửa banner thành công  , Chuyển trang sau 1s"
                        })
                        await pause(1000)
                        navigate("/admin/banner")
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
            <div>
                <h2 className="text-xl uppercase font-bold mb-4">Sửa Sản Phẩm </h2>
                <div className="flex gap-40">

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
                            label="Ảnh sản phẩm"
                            name="name"
                            rules={[{ required: true, message: "Please input your image!" }]}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Tác vụ">
                            <>
                                <Button htmlType="submit">Sửa banner </Button>
                            </>
                        </Form.Item>
                    </Form>
                    <div >
                        <h4 className='mb-2 text-xl'>Ảnh banner</h4>
                        <img className='w-52 rounded-sm' src={banner?.name} alt="anh" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditBanner


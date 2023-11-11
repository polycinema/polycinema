import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { pause } from '../../../utils/pause';
import { ICount, getAcounteById, updateAcount } from '../../../api/Acount';
import { Select } from 'antd';

type FieldType = {
        name: string;
        email: string;
        password: string;
        role: string
};
const EditAcount = (props: Props) => {
        const { id } = useParams()
        const [form] = Form.useForm()
        const [messageApi, contextHolder] = message.useMessage()
        const navigate = useNavigate();
        const [acounts, setAcounts] = useState<ICount>()
        const onChange = (value: string) => {
                console.log(`selected ${value}`);
        };

        const onSearch = (value: string) => {
                console.log('search:', value);
        };
        // Filter `option.label` match the user type `input`
        const filterOption = (input: string, option?: { label: string; value: string }) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



        useEffect(() => {
                (
                        async () => {
                                try {
                                        const { data } = await getAcounteById(id)
                                        setAcounts(data.data);

                                } catch (error) {
                                        console.log(error);

                                }
                        }
                )()

        }, [])
        useEffect(() => {
                setFields();
        }, [acounts]);
        const setFields = () => {
                form.setFieldsValue({
                        id: acounts?.id,
                        name: acounts?.name,
                        email: acounts?.email,
                        password: acounts?.password,
                        role: acounts?.role,
                });
        };




        const onFinish = (values) => {
                updateAcount({ id: id, ...values })
                        .then(async () => {
                                form.resetFields()
                                messageApi.open({
                                        type: "success",
                                        content: "Cập nhật tải khoản thành công , Chuyển trang sau 3s"
                                })
                                await pause(3000)
                                navigate("/admin/acount")
                        })
                        .catch((err) => {
                                console.log(err.message);

                        })


        };

        const onFinishFailed = (errorInfo: any) => {
                console.log('Failed:', errorInfo);
        };
        return (
                <>
                        {contextHolder}
                        <div>
                                <h1 className='text-4xl m-6'>Cập nhật thể loại phim</h1>
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
                                >
                                        <Form.Item<FieldType>
                                                label="Tên tài khoản"
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

                                        <Form.Item<FieldType>
                                                label="Role"
                                                name="role"
                                                rules={[{ required: true, message: 'Role không được để trống' }]}
                                        >
                                                <Select
                                                        showSearch
                                                        placeholder="Select a person"
                                                        optionFilterProp="children"
                                                        onChange={onChange}
                                                        onSearch={onSearch}
                                                        filterOption={filterOption}
                                                        options={[
                                                                {
                                                                        value: 'user',
                                                                        label: 'user',
                                                                },
                                                                {
                                                                        value: 'admin',
                                                                        label: 'admin',
                                                                },
                                                        ]}
                                                />

                                        </Form.Item>


                                        <Form.Item
                                                wrapperCol={{ offset: 8, span: 16 }}
                                                label="Tác vụ :"

                                        >

                                                <Button
                                                        htmlType="submit">
                                                        Cập nhật tài khoản
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </div>
                </>
        )
}

export default EditAcount
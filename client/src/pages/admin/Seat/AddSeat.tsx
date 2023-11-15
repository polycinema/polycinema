import React, { useState,useEffect } from 'react'
import { Button, Form, Input,  Select, message } from 'antd';

import { useNavigate } from 'react-router';
import { pause } from '../../../utils/pause';
import { ISeat, addSeat } from '../../../api/Seat';
import { ICount, getAllAcount } from '../../../api/Acount';

type FieldType = {
        seat_name: string;
        type: string;
        // room_id: number;

};
const AddSeat = () => {
        const { Option } = Select;
        const [form] = Form.useForm()
        const [messageApi, contextHolder] = message.useMessage()
        const navigate = useNavigate();
        const [acount,setAcount]=useState()
        useEffect(()=>{
                (async()=>{
                    try {
                        
                        const {data:dataAcount} = await getAllAcount()
                        setAcount(dataAcount.data);
                       
                      
                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                })()
            },[])


        const onFinish = async (value: ISeat) => {
               
                
                addSeat( value )
                        .then(async () => {
                                form.resetFields()
                                messageApi.open({
                                        type: "success",
                                        content: "Thêm ghế thành công , Chuyển trang sau 3s"
                                })
                                await pause(3000)
                                navigate("/admin/seat")
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
                                <h1 className='text-4xl m-6'>Thêm ghế</h1>
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
                                                label="Seat Name"
                                                name="seat_name"
                                                rules={[{ required: true, message: 'Please input your name!' }]}
                                        >
                                                <Input />
                                        </Form.Item>

                                        <Form.Item
                                         name="type"
                                         label="Type"
                                        rules={[{ required: true, message: 'Please select the type!' }]}
                                        >
                                        <Select placeholder="Select type">
                                        <Option value="single">Ghế đơn </Option>
                                        <Option value="double">Ghế đôi</Option>
                                        <Option value="special">Ghế VIP</Option>
                                        </Select>
                                </Form.Item>


                                <Form.Item
                        label="Room"
                        name='room_id'
                        rules={[{ required: true, message: 'Phòng không được để trống' }]}
                    >
                        <Select
                            style={{ width: 120 }}
                            options={acount?.map((item:ICount)=>{
                                return {
                                    value: item.id,label:item.name
                                }
                             })}
                        />
                    </Form.Item>





                                        <Form.Item
                                                wrapperCol={{ offset: 8, span: 16 }}
                                                label="Tác vụ :"
                                        >

                                                <Button
                                                        htmlType="submit">
                                                        Thêm ghế
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </div>
                </>
        )
}

export default AddSeat;
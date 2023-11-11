import { Form, Input } from "antd";
import { Button, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ISeat, getSeatById, updateSeat } from "../../../api/Seat";
import { pause } from "../../../utils/pause";

import { IRoom, getAllRoom } from '../../../api/room';
type FieldType = {
        seat_name: string;
        type: string;
        room_id: number;
           
};
const EditSeat = (props: Props) => {
        
const { Option } = Select;
  const { id } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [seat, setSeat] = useState<ISeat>();
  console.log(seat);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSeatById(id);
        setSeat(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      id: seat?.id,
      seat_name: seat?.seat_name,
      type: seat?.type,
      room_id:seat?.room_id,
    });
  }, [seat]);
  const [rooms,setRooms]=useState()
  useEffect(()=>{
          (async()=>{
              try {
                  
                  const {data:dataRooms} = await getAllRoom()
                  setRooms(dataRooms.data);
                 
                
                  
              } catch (error) {
                  console.log(error);
                  
              }
          })()
      },[])

  const onFinish = (values) => {

    updateSeat({ id: id, ...values })
      .then(async () => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Cập nhập phòng thành công, Chuyển trang sau 3s",
        });
        await pause(3000);
        navigate("/admin/seat");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
  };

  
        return (
                <>
                        {contextHolder}
                        <div>
                                <h1 className='text-4xl m-6'>Cập nhật ghế</h1>
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
                            options={rooms?.map((item:IRoom)=>{
                                return {
                                    value: item.id, label: item.room_name
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
                                                        Cập nhật ghế 
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </div>
                </>
        )
};
export default EditSeat;

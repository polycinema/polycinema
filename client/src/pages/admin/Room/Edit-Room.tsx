// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IRoom, getRoomById, updateRoom } from "../../../api/room";
import { pause } from "../../../utils/pause";
type FieldType = {
  room_name?: string;
  single_seat?: number;
  double_seat?: number;
  special_seat?: number;
};
const EditRoom = (props: Props) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [room, setRoom] = useState<IRoom>();
  console.log(room);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getRoomById(id);
        setRoom(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      id: room?.id,
      room_name: room?.room_name,
      single_seat: room?.single_seat,
      double_seat: room?.double_seat,
      special_seat: room?.special_seat

    });
  }, [room]);

  const onFinish = (values) => {

    updateRoom({ id: id, ...values })
      .then(async () => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Cập nhập phòng thành công, Chuyển trang sau 3s",
        });
        await pause(3000);
        navigate("/admin/rooms");
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
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4">Cập nhật Phòng </h2>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên phòng"
            name="room_name"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
          label="Ghế thường"
          name="single_seat"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber min={0} max={60} defaultValue={0}/>
        </Form.Item>
        <Form.Item<FieldType>
          label="Ghế đôi"
          name="double_seat"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber min={0} max={30} defaultValue={0}/>
        </Form.Item>
        <Form.Item<FieldType>
          label="Ghế VIP"
          name="special_seat"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber min={0} max={20} defaultValue={0}/>
        </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }} label="Tác vụ">
            {contextHolder}
            <Button htmlType="submit">Cập nhật phòng </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default EditRoom;

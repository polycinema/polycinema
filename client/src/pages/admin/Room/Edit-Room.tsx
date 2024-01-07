// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IRoom, getRoomById, updateRoom } from "../../../api/room";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
type FieldType = {
  room_name?: string;
  single_seat?: number;
  double_seat?: number;
  special_seat?: number;
};
const EditRoom = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
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
      special_seat: room?.special_seat,
    });
  }, [room]);

  const onFinish = (values) => {
    updateRoom({ id: id, ...values })
    .then(async () => {
      form.resetFields();
      await swal("Thành công!", "Cập nhật phòng thành công!", "success");
      navigate("/admin/rooms");
    })
    .catch(() => {
      swal("Thất bại!", "Cập nhật phòng thất bại, Vui lòng thử lại !", "error");
    });
  };

  return (
    <>
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Cập nhật Phòng </h2>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-4 rounded-md shadow-md"
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
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={60}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ghế đôi"
            name="double_seat"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={30}
              defaultValue={0}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ghế VIP"
            name="special_seat"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={20}
              defaultValue={0}
            />
          </Form.Item>

          <Form.Item label="Tác vụ">
            <Button htmlType="submit">
              <VerticalAlignTopOutlined />{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default EditRoom;

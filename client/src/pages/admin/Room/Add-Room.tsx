// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import { Button, message } from "antd";
import { addRoom } from "../../../api/room";
import { useNavigate } from "react-router";
import { pause } from "../../../utils/pause";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
type FieldType = {
  room_name?: string;
  single_seat?: number;
  double_seat?: number;
  special_seat?: number;
};
const AddRoom = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    addRoom(values)
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm phòng thành công!", "success");
        navigate("/admin/rooms");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm phòng thất bại, Vui lòng thử lại !", "error");
      })
  };
  return (
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Phòng mới </h2>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          <>
            {contextHolder}
            <Button htmlType="submit">
              <VerticalAlignTopOutlined />{" "}
            </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddRoom;

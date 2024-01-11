// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber } from "antd";
import { Button } from "antd";
import { addRoom } from "../../../api/room";
import { useNavigate } from "react-router";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
type FieldType = {
  room_name?: string;
  single_seat?: number;
  double_seat?: number;
  special_seat?: number;
  single_seat_price?:number;
  double_seat_price?:number;
  special_seat_price?:number;

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
      <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Thêm Phòng mới </h2>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          label="Giá ghế thường"
          name="single_seat_price"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
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
          label="Giá ghế đôi"
          name="double_seat_price"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
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
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Giá ghế VIP"
          name="special_seat_price"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            defaultValue={0}
          />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <>
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

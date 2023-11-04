// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Button, message } from "antd";
import { addRoom } from "../../../api/room";
import { useNavigate } from "react-router";
import { pause } from "../../../utils/pause";
type FieldType = {
  room_name?: string;
  capacity?: number;
};
const AddRoom = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = (values) => {
    addRoom(values)
      .then(async () => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Thêm phòng mới thành công, Chuyển trang sau 3s",
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
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Phòng mới </h2>
      <Form
        // onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FieldType>
          label="Tên phòng"
          name="room_name"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số Phòng"
          name="capacity"
          rules={[{ required: true, message: "Please input your room!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <>
            {contextHolder}
            <Button htmlType="submit">Thêm thể loại </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddRoom;

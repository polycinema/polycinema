// import { UploadOutlined } from "@ant-design/icons";
import {  Form, Input } from "antd";
import { Button, message } from "antd";

export default function AddRoom() {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm phòng thành công",
      className: "custom-class",
      style: {
        marginTop: "0vh",
      },
    });
  };

  return (
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Phòng mới </h2>
      <Form
        // onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
      >
        <Form.Item label="Tên phòng">
          <Input name="name" />
        </Form.Item>
        <Form.Item label="Số Phòng">
          <Input  name="number" />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <>
            {contextHolder}
            <Button onClick={success}>Thêm phòng </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
}

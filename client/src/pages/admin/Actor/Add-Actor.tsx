import { UploadOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Upload } from "antd";
import { Button, message } from "antd";

export default function AddActor() {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm diễn viên thành công",
      className: "custom-class",
      style: {
        marginTop: "0vh",
      },
    });
  };

  return (
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Diễn Viên </h2>
      <Form
        // onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
      >
        <Form.Item label="Tên Diễn Viên">
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Ảnh diễn viên"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Ngày sinh diễn viên">
          <DatePicker format={"DD/MM/YYYY"} name="release_date" />

        </Form.Item>

        <Form.Item label="Tác vụ">
          <>
            {contextHolder}
            <Button onClick={success}>Thêm Diễn Viên </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  );
}

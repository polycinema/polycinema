import { UploadOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, Form, Input, Space, Upload, UploadProps } from "antd";
import { Button, message } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { useState } from "react";
import { IActor, addActor } from "../../../api/actor";
import { useNavigate } from "react-router";
import { pause } from "../../../utils/pause";

const AddActor = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [datetime, setdatetime] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const onFinish = (values: IActor) => {
    addActor({ ...values, image: urlImage, date_of_birth:datetime })
      .then(async () => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Thêm diễn viên thành công , Chuyển trang sau 3s",
        });
        await pause(3000);
        navigate("/admin/actors");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  const onChangeDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setdatetime(dateString);
  };

  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    // Thay đổi thành URL API của Cloudinary
    headers: {
      // Authorization: 'Bearer 773215578244178',
      // "Access-Control-Allow-Origin":"*"
      // Thay đổi thành API key của bạn
    },
    data: {
      // Thêm các dữ liệu cần thiết như upload preset
      upload_preset: "upload",
      // Thay đổi thành upload preset của bạn
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setUrlImage(info.file.response.url);
        message.open({
          type: "success",
          content: "Upload ảnh thành công",
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
    {contextHolder}
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Diễn Viên </h2>
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
        <Form.Item label="Tên Diễn Viên" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh diễn viên"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
        label="Ngày sinh diễn viên"
        name="date_of_birth">
                        <DatePicker format={"YYYY-MM-DD"}  onChange={onChangeDate} />

        </Form.Item>

        <Form.Item label="Tác vụ">
          <>
            <Button htmlType="submit">Thêm Diễn Viên </Button>
          </>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};
export default AddActor;

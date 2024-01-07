import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { INews, addNews } from "../../../api/News";
import TextArea from "antd/es/input/TextArea";
import swal from "sweetalert";

type FieldType = {
  title: string;
  summary: string;
  description: string;
  image: string;
};
const AddNews = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");

  const onFinish = async (value: INews) => {
    addNews({ ...value, image: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm tin tức thành công!", "success");
        navigate("/admin/news");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm tin tức thất bại , Vui lòng thử lại !", "error");
      });
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
      <div>
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Thêm Tin Tức</h1>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item<FieldType>
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Tóm tắt "
            name="summary"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Ảnh tin tức"
            name="image"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Tác vụ :">
            <Button htmlType="submit">
              <VerticalAlignTopOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddNews;

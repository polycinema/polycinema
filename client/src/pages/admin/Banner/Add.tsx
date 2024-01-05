import React, { useState } from "react";
import { Button, Form, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { pause } from "../../../utils/pause";
import swal from "sweetalert";
import { addBanner } from "../../../api/Banner";

type FieldType = {
  name: string;
};

const AddBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");

  const onFinish = async () => {
    addBanner({ name: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm banner thành công!", "success");
        navigate("/admin/banner");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm banner thất bại , Vui lòng thử lại !", "error");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        <h1 className="text-4xl m-6">Thêm banner</h1>
        <div className="grid grid-cols-2 gap-10">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Ảnh banner"
              name="name"
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
          <div className="w-full">
            <h4 className="mb-2 text-xl">Ảnh banner</h4>
            <img className="w-full rounded-sm" src={urlImage} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;

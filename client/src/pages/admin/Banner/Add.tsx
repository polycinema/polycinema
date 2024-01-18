import React, { useState } from "react";
import { Button, Form, Select, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { addBanner } from "../../../api/Banner";

type FieldType = {
  name: string;
  status: string;
};

const AddBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");
console.log(urlImage);

  const onFinish = async (value) => {
    addBanner({ name: urlImage, status:value?.status })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm banner thành công!", "success");
        navigate("/admin/banner");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm banner thất bại , Vui lòng thử lại !", "error");
      });
  };

  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    data: {
      upload_preset: "upload",
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">
          Thêm banner
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="bg-white p-4 rounded-md shadow-md"
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
            <Form.Item
              label="Trạng thái"
              name="status"
              rules={[
                { required: true, message: "Trạng thái không được để trống" },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Trạng thái Banner ..."
                options={[
                  { value: "active", label: "Hiển thị" },
                  { value: "deactive", label: "Ẩn" },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item label="Tác vụ :">
              <Button htmlType="submit">
                <VerticalAlignTopOutlined />
              </Button>
            </Form.Item>
          </Form>
          <div className="w-full bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh banner</h4>
            <img className="w-full rounded-sm" src={urlImage} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;

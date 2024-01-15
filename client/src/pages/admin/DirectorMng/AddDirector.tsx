import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { useAddDirectorMutation } from "../../../redux/api/directorApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  name: string;
  image: string;
};
const AddDirector = () => {
  const [addDirector,{isLoading}] = useAddDirectorMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");
  const onFinish = async (value) => {
    addDirector({ ...value, image: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm đạo diễn thành công!", "success");
        navigate("/admin/director");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm tài khoản thất bại , Vui lòng thử lại !", "error");
      });
  };


  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md ">Thêm Đạo Diễn</h1>
        <div className="grid grid-cols-2 gap-10 ">
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
              label="Tên đạo diễn"
              name="name"
              rules={[{ required: true, message: "Tên không được để trống" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Ảnh đạo diễn"
              name="image"
              rules={[{ required: true, message: "Ảnh không được để trống" }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Tác vụ :">
              <Button htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}
              </Button>
            </Form.Item>
          </Form>
          <div className="bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh đạo diễn</h4>
            <img className="w-full rounded-sm" src={urlImage} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDirector;

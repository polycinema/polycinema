import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { useAddSeatTypeMutation } from "../../../redux/api/seatApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  name: string;
  image: string;
  price: number | string;
};

const AddSeatType = () => {
  const [addSeatType, { isLoading }] = useAddSeatTypeMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");
  const onFinish = async (value) => {
    addSeatType({ ...value, image: urlImage })
      .unwrap()
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm thể loại ghế thành công!", "success");
        navigate("/admin/seats");
      })
      .catch(() => {
        swal(
          "Thất bại!",
          "Thêm thể loại ghế thất bại , Vui lòng thử lại !",
          "error"
        );
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md ">
          Thêm thể loại ghế
        </h1>
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
            label="Tên thể loại ghế"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Ảnh thể loại ghê"
            name="image"
            rules={[{ required: true, message: "Ảnh không được để trống" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="Giá thể loại ghế"
            name="price"
            rules={[{ required: true, message: "price không được để trống" }]}
          >
            <Input />
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
      </div>
    </>
  );
};

export default AddSeatType;

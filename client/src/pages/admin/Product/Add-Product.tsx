import React, { useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { useAddProductMutation } from "../../../redux/api/productApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const { TextArea } = Input;

type FieldType = {
  name: string;
  image: string;
  price: string;
  description: string;
};

const AddProduct = () => {
  const [addProduct,{isLoading}] = useAddProductMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");

  const onFinish = async (value: IProduct) => {
    addProduct({ ...value, image: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm sản phẩm thành công!", "success");
        navigate("/admin/products");
      })
      .catch(() => {
        swal("Thành công!", "Thêm sản phẩm thất bại!", "success");
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Thêm Sản Phẩm</h1>
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
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Ảnh sản phẩm"
            name="image"
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item<FieldType>
            label="Giá sản phẩm"
            name="price"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
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

export default AddProduct;

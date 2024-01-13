import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  UploadProps,
  message,
} from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../../redux/api/productApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const { TextArea } = Input;

type FieldType = {
  name: string;
  image: string;
  price: string;
  description: string;
};

const EditProduct = () => {
  const { id } = useParams();
  const {data:product} = useGetProductByIdQuery(id||"")
  const [updateProduct,{isLoading}] = useUpdateProductMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState<string>();

  useEffect(() => {
    setFields();
  }, [product]);
  const setFields = () => {
    form.setFieldsValue({
      id: product?.data?.id,
      name: product?.data?.name,
      image: product?.data?.image,
      price: product?.data?.price,
      description: product?.data?.description,
    });
  };

  const onFinish = async (value: IProduct) => {
    urlImage === undefined
      ? updateProduct({ id: id, ...value })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Cập nhật sản phẩm thành công!", "success");
            
            navigate("/admin/products");
          })
          .catch(() => {
            swal("Thất bại!", "Cập nhật sản phẩm thất bại , Vui lòng thử lại !", "error");
          })
      : updateProduct({ id: id, ...value, image: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Cập nhật sản phẩm thành công!", "success");
        
        navigate("/admin/products");
      })
      .catch(() => {
        swal("Thất bại!", "Cập nhật sản phẩm thất bại , Vui lòng thử lại !", "error");
      })
  }
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
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Cập nhật Sản Phẩm </h2>
        <div className="grid grid-cols-2 gap-10">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="bg-white p-4 rounded-md shadow-md"

          >
            <Form.Item label="Tên sản phẩm" name="name">
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
            <Form.Item label="Price" name="price">
              <InputNumber />
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

            <Form.Item label="Tác vụ">
              <>
                <Button htmlType="submit">
                {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}
                </Button>
              </>
            </Form.Item>
          </Form>
          <div className="w-full bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh sản phẩm</h4>
            <img className="full rounded-sm" src={product?.data?.image} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;

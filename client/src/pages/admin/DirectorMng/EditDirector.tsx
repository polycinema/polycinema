import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import { useGetDirectorByIdQuery, useUpdateDirectorMutation } from "../../../redux/api/directorApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  name: string;
  image: string;
};

const EditDirector = () => {
  const { id } = useParams();
  const {data:director} = useGetDirectorByIdQuery(id||"")
  const [updateDirector,{isLoading}] = useUpdateDirectorMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState<string>();

  useEffect(() => {
    setFields();
  }, [director]);
  const setFields = () => {
    form.setFieldsValue({
      id: director?.data?.id,
      name: director?.data?.name,
      image: director?.data?.image,
    });
  };

  const onFinish = async (value) => {
    urlImage === undefined
      ? updateDirector({ id: id, ...value })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Cập nhật đạo diễn thành công!", "success");
        navigate("/admin/director");
      })
      .catch(() => {
        swal("Thất bại!", "Cập nhật tài khoản thất bại , Vui lòng thử lại !", "error");
      })
      : updateDirector({ id: id, ...value, image: urlImage })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Cập nhật đạo diễn thành công!", "success");
        navigate("/admin/director");
      })
      .catch(() => {
        swal("Thất bại!", "Cập nhật tài khoản thất bại , Vui lòng thử lại !", "error");
      });
  };


  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    data: { upload_preset: "upload" },
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Câp nhật Đạo Diễn</h1>
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
            <img
              className="w-full rounded-sm"
              src={director?.data?.image}
              alt="anh"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDirector;

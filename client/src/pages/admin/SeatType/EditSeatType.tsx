import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import swal from "sweetalert";
import {
  useAddSeatTypeMutation,
  useGetSeatTypeByIdQuery,
  useUpdateSeatTypeMutation,
} from "../../../redux/api/seatApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  name: string;
  image: string;
  price: number | string;
};

const EditSeatType = () => {
  const { id } = useParams();
  const { data: seatType } = useGetSeatTypeByIdQuery(id || "");
  const [updateSeatType, { isLoading }] = useUpdateSeatTypeMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");
  useEffect(() => {
    setFields();
  }, [seatType]);
  const setFields = () => {
    form.setFieldsValue({
      id: seatType?.data?.id,
      name: seatType?.data?.name,
      price: seatType?.data?.price,
    });
  };
  const onFinish = async (value) => {
    
    urlImage === ""
      ? updateSeatType({ id: id, ...value, image: seatType?.data?.image })
          .unwrap()
          .then(async () => {
            form.resetFields();
            await swal(
              "Thành công!",
              "Cập nhật thể loại ghế thành công!",
              "success"
            );
            navigate("/admin/seats");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Cập nhật thể loại ghế thất bại , Vui lòng thử lại !",
              "error"
            );
          })
      : updateSeatType({ id: id, ...value, image: urlImage })
          .unwrap()
          .then(async () => {
            form.resetFields();
            await swal(
              "Thành công!",
              "Cập nhật thể loại ghế thành công!",
              "success"
            );
            navigate("/admin/seats");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Cập nhật thể loại ghế thất bại , Vui lòng thử lại !",
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
          Cập nhật thể loại ghế
        </h1>
        <div className="grid grid-cols-2 gap-10">
          <Form
            name="basic"
            form={form}
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
            <Form.Item<FieldType> label="Ảnh thể loại ghê" name="image">
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

          <div className="bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh thể loại ghế</h4>
            <img
              className="w-60 rounded-sm mx-auto"
              src={seatType?.data?.image}
              alt="anh"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSeatType;

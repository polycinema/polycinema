import React, { useEffect, useState } from "react";
import { Button, Form, Select, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { IBanner, getBannerById, updateBanner } from "../../../api/Banner";
import swal from "sweetalert";

type FieldType = {
  name: string;
};

const EditBanner = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [banner, setBanner] = useState<IBanner>();
  const [urlImage, setUrlImage] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getBannerById(id);
        setBanner(data.data);
      } catch (error) {
        message.error(error);
      }
    })();
  }, []);
  useEffect(() => {
    setFields();
  }, [banner]);
  const setFields = () => {
    form.setFieldsValue({
      id: banner?.id,
      name: banner?.name,
      status: banner?.status,
    });
  };

  const onFinish = async (value: IBanner) => {
    urlImage === undefined
      ? updateBanner({ id: id, name: banner?.name,...value })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Thêm banner thành công!", "success");
            navigate("/admin/banner");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Thêm banner thất bại , Vui lòng thử lại !",
              "error"
            );
          })
      : updateBanner({ id: id, name: urlImage,...value })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Thêm banner thành công!", "success");
            navigate("/admin/banner");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Thêm banner thất bại , Vui lòng thử lại !",
              "error"
            );
          });
  };

  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    data: { upload_preset: "upload" },
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
      <div>
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">
          Cập nhật Banner{" "}
        </h2>
        <div className="grid grid-cols-2 gap-10">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className=" bg-white p-4 rounded-md shadow-md"
          >
            <Form.Item<FieldType> label="Ảnh Banner" name="name">
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
            <Form.Item label="Tác vụ">
              <>
                <Button htmlType="submit">
                  <VerticalAlignTopOutlined />{" "}
                </Button>
              </>
            </Form.Item>
          </Form>
          <div className="w-full bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh banner</h4>
            <img className="w-full rounded-sm" src={banner?.name} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBanner;

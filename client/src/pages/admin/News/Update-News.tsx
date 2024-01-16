import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, UploadProps, message } from "antd";
import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { INews, getNewsById, updateNews } from "../../../api/News";
import TextArea from "antd/es/input/TextArea";
import swal from "sweetalert";

type FieldType = {
  title: string;
  summary: string;
  description: string;
  image: string;
};

const EditNews = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [news, setNew] = useState<INews>();
  const [urlImage, setUrlImage] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getNewsById(id);
        setNew(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    setFields();
  }, [news]);
  const setFields = () => {
    form.setFieldsValue({
      id: news?.id,
      title: news?.title,
      summary: news?.summary,
      description: news?.description,
      image: news?.image,
    });
  };

  const onFinish = async (value: INews) => {
    urlImage === undefined
      ? updateNews({ id: id, ...value })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Thêm tin tức thành công!", "success");
            navigate("/admin/news");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Thêm tin tức thất bại , Vui lòng thử lại !",
              "error"
            );
          })
      : updateNews({ id: id, ...value, image: urlImage })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Thêm tin tức thành công!", "success");
            navigate("/admin/news");
          })
          .catch(() => {
            swal(
              "Thất bại!",
              "Thêm tin tức thất bại , Vui lòng thử lại !",
              "error"
            );
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
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Câp nhật Tin Tức</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 p-4 bg-white  rounded-md shadow-md">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              className="mx-5"
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
                rules={[
                  { required: true, message: "Please input your image!" },
                ]}
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
          <div className="col-span-1  w-full bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh tin tức</h4>
            <img className="w-full rounded-sm" src={news?.image} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNews;

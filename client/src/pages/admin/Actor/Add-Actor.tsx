import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Upload, UploadProps } from "antd";
import { Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import swal from "sweetalert";
import { useAddActorMutation } from "../../../redux/api/actorsApi";

const AddActor = () => {
  const [addActor ,{isLoading}] = useAddActorMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState("");
  const onFinish = (values) => {
    addActor({
      ...values,
      image: urlImage,
      date_of_birth: dayjs(values.date_of_birth).format("YYYY/MM/DD"),
    })
      .unwrap()
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm diễn viên thành công!", "success");
        navigate("/admin/actors");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm diễn viên thất bại , Vui lòng thử lại !", "error");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
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
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Thêm Diễn Viên </h2>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off" 
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item
            label="Tên Diễn Viên"
            name="name"
            rules={[
              { required: true, message: "Tên diễn không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh diễn viên"
            name="image"
            rules={[{ required: true, message: "Ảnh không được để trống" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Ngày sinh diễn viên"
            name="date_of_birth"
            rules={[
              { required: true, message: "Ngày sinh không được để trống" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
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
      </div>
    </>
  );
};
export default AddActor;

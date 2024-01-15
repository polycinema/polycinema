import { UploadOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Upload, UploadProps } from "antd";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import swal from "sweetalert";
import { useEditActorMutation, useGetActorByIDQuery } from "../../../redux/api/actorsApi";

const EditActor = () => {
  const { id } = useParams();
  const {data:actor} = useGetActorByIDQuery(id || "")
  const [updateActor,{isLoading}] = useEditActorMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlImage, setUrlImage] = useState<string>();

  
  const onFinish = async (value: IActor) => {
    urlImage === undefined
      ? updateActor({
          id: id,
          ...value,
          image: actor?.image,
          date_of_birth: dayjs(value.date_of_birth).format("YYYY/MM/DD"),
        })
        .then(async () => {
          form.resetFields();
          await swal("Thành công!", "Cập nhật diễn viên thành công!", "success");
          navigate("/admin/actors");
        })
        .catch(() => {
          swal("Thất bại!", "Cập nhật diễn viên thất bại , Vui lòng thử lại !", "error");
        })
      : updateActor({
          id: id,
          ...value,
          image: urlImage,
          date_of_birth: dayjs(value.date_of_birth).format("YYYY/MM/DD"),
        })
          .then(async () => {
            form.resetFields();
            await swal("Thành công!", "Cập nhật diễn viên thành công!", "success");
            navigate("/admin/actors");
          })
          .catch(() => {
            swal("Thất bại!", "Cập nhật diễn viên thất bại , Vui lòng thử lại !", "error");
          });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
  useEffect(() => {
    setFields();
  }, [actor]);
  const setFields = () => {
    form.setFieldsValue({
      id: actor?.data?.id,
      name: actor?.data?.name,
      image: actor?.data?.image,
      date_of_birth: dayjs(actor?.data?.date_of_birth, "YYYY/MM/DD"),
    });
  };
  return (
    <>
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">
          Cập nhật diễn viên
        </h2>
        <div className="grid grid-cols-2 gap-10 w-full">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Form.Item
              label="Tên Diễn Viên"
              name="name"
              rules={[{ required: true, message: "Tên  không được để trống" }]}
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
          <div className="bg-white p-4 rounded-md shadow-md">
            <h4 className="mb-2 text-xl">Ảnh diễn viên</h4>
            <img className="w-72 rounded-sm" src={actor?.data?.image} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditActor;

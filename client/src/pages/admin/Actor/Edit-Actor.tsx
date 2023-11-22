import { UploadOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Upload,
  UploadProps,
} from "antd";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { IActor, getActorById, updateActor } from "../../../api/actor";
import { pause } from "../../../utils/pause";
import dayjs from "dayjs";

const EditActor = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [actor, setActor] = useState<IActor>();
  const [urlImage, setUrlImage] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getActorById(id);
        setActor(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const onFinish = async (value: IActor) => {
    urlImage === undefined
      ? updateActor({
          id: id,
          ...value,
          image: actor?.image,
          date_of_birth: dayjs(value.date_of_birth).format("YYYY/MM/DD") 
        })
          .then(async () => {
            form.resetFields();
            messageApi.open({
              type: "success",
              content: "Thêm diễn viên thành công , Chuyển trang sau 1s",
            });
            await pause(1000);
            navigate("/admin/actors");
          })
          .catch((err) => {
            console.log(err.message);
          })
      : updateActor({
          id: id,
          ...value,
          image: urlImage,
          date_of_birth: dayjs(value.date_of_birth).format("YYYY/MM/DD")
        })
          .then(async () => {
            form.resetFields();
            messageApi.open({
              type: "success",
              content: "Thêm diễn viên thành công , Chuyển trang sau 1s",
            });
            await pause(1000);
            navigate("/admin/actors");
          })
          .catch((err) => {
            console.log(err.message);
          });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    
    data: {upload_preset: "upload",},
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
  useEffect(() => {
    setFields();
  }, [actor]);
  const setFields = () => {
    form.setFieldsValue({
      id: actor?.id,
      name: actor?.name,
      image: actor?.image,
      date_of_birth:dayjs(actor?.date_of_birth, "YYYY/MM/DD")
    });
  };
  return (
    <>
      {contextHolder}
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4">Thêm Diễn Viên </h2>
        <div className="flex gap-40">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item 
            label="Tên Diễn Viên" 
            name="name"
            rules={[{ required: true, message: 'Tên  không được để trống' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ảnh diễn viên"
              name="image"
              rules={[{ required: true, message: 'Ảnh không được để trống' }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item 
            label="Ngày sinh diễn viên" 
            name="date_of_birth"
            rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
            >

              <DatePicker   />
            </Form.Item>

            <Form.Item label="Tác vụ">
              <>
                <Button htmlType="submit">Cập nhật Diễn Viên </Button>
              </>
            </Form.Item>
          </Form>
          <div>
            <h4 className="mb-2 text-xl">Ảnh diễn viên</h4>
            <img className="w-72 rounded-sm" src={actor?.image} alt="anh" />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditActor;

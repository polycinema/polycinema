import { UploadOutlined } from "@ant-design/icons";
import {
  DatePicker,
  DatePickerProps,
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
import { RangePickerProps } from "antd/es/date-picker";
import { IDirector } from "../../../api/director";

const EditActor = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [actor, setActor] = useState<IActor>();
  const [urlImage, setUrlImage] = useState<string>();
  const [datetime, setdatetime] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getActorById(id);
        setActor(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const onFinish = async (value: IActor) => {
    urlImage === undefined || datetime === undefined
      ? updateActor({
          id: id,
          ...value,
          image: actor?.image,
          date_of_birth: actor?.date_of_birth,
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
          date_of_birth: datetime,
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
  const onChangeDate = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setdatetime(dateString);
  };
  useEffect(() => {
    setFields();
  }, [actor]);
  const setFields = () => {
    form.setFieldsValue({
      id: actor?.id,
      name: actor?.name,
      image: actor?.image,
      // date_of_birth:actor?.date_of_birth
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
            <Form.Item label="Tên Diễn Viên" name="name">
              <Input />
            </Form.Item>
            <Form.Item
              label="Ảnh diễn viên"
              name="image"
              rules={[{ required: true, message: "Please input your image!" }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Ngày sinh diễn viên" name="date_of_birth">
              <DatePicker format={"YYYY-MM-DD"} onChange={onChangeDate} />
              <span>{actor?.date_of_birth}</span>
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

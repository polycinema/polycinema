import { PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
  UploadProps,
  message,
  notification,
} from "antd";
import { Option } from "antd/es/mentions";
import { useAppSelector } from "../../store/hook";
import { useEffect, useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
} from "../../redux/api/authApi";
import dayjs from "dayjs";

const InfoAccount = () => {
  const { user }: any = useAppSelector((state) => state.Authorization);
  const [form] = Form.useForm();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  const [urlImage, setUrlImage] = useState<string>();
  const { data: UserById } = useGetUserByIdQuery(user.id);

  useEffect(() => {
    (async () => {
      await form.setFieldsValue({
        name: UserById?.data.name ?? "Chưa có thông tin",
        phone: UserById?.data.phone ?? "Chưa có thông tin",
        email: UserById?.data.email ?? "Chưa có thông tin",
        date_of_birth:
          dayjs(UserById?.data.date_of_birth) ?? "Chưa có thông tin",
        gender: UserById?.data.gender ?? "Chưa có thông tin",
        // image: UserById?.data.image,
        // UserById_id: user?.id
      });
    })();
  }, [UserById]);
  const onFinish = (value: User) => {
    console.log("value: ", value);

    updateProfile({
      name: value.name,
      phone: value.phone,
      email: value.email,
      date_of_birth: dayjs(value.date_of_birth).format("YYYY/MM/DD"),
      image: urlImage,
      gender: value.gender,
      user_id: user.id,
    })
      .unwrap()
      .then((user) => {
        try {
          console.log("user update: ", user);
          notification.success({ message: "update profile successfully" });
          // navigate("/admin/showtime");
        } catch (error) {
          console.error("error update profile: ", error);
        }
      });
  };
  const props: UploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dbktpvcfz/image/upload",
    data: { upload_preset: "upload" },
    onChange(info) {
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
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
    <div className="max-w-4xl mx-auto">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {UserById?.data.image ? (
            <Image width={200} src={UserById?.data.image} />
          ) : (
            "Chưa cập nhật avatar"
          )}
        </Form.Item>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              name={"name"}
              label="Họ Tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Họ Tên" />
            </Form.Item>
            <Form.Item
              name={"phone"}
              label="Số Điện Thoại"
              rules={[
                { required: true, message: "Vui lòng nhập Số điện thoại" },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="SĐT" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập email",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={"date_of_birth"}
              label="Ngày Sinh"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name={"gender"}
              label="Giới Tính"
              rules={[{ required: true, message: "Vui lòng nhập giới tính" }]}
            >
              <Select placeholder="Giới tính" allowClear>
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="link">Đổi mật khẩu</Button>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Cập Nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InfoAccount;
interface User {
  id: number;
  name: string;
  full_name?: any;
  image?: any;
  email: string;
  email_verified_at?: any;
  role: string;
  phone?: any;
  date_of_birth?: any;
  gender?: any;
  deleted_at?: any;
  created_at: string;
  updated_at: string;
}

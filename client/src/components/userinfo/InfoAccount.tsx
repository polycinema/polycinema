import { PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/es/mentions";

const InfoAccount = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Form layout="vertical">
        <Form.Item>
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              name={"username"}
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
              name={"birth"}
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

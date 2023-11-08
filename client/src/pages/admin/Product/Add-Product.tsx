import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Space, Upload, UploadProps } from "antd";
import { Button, message } from "antd";



const AddProduct = () => {
  return (
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4">Thêm Sản Phẩm </h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Tên sản phẩm" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh sản phẩm"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Upload >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
        label="Price"
        name="price">
                      <InputNumber/>

        </Form.Item>

        <Form.Item label="Tác vụ">
          <>
            <Button htmlType="submit">Thêm Sản Phẩm </Button>
          </>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProduct

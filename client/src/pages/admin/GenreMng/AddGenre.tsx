import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { useAddGenresMutation } from "../../../redux/api/genresApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type FieldType = {
  name?: string;
};

const AddGenre = () => {
  const [addGenre,{isLoading}] = useAddGenresMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    addGenre(values)
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm thể loại thành công!", "success");
        navigate("/admin/genres");
      })
      .catch(() => {
        swal("Thất bại!", "Thêm thể loại thất bại , Vui lòng thử lại !", "error");
      });
  };
  return (
    <>
      <div>
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Thêm thể loại phim</h1>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item<FieldType>
            label="Tên thể loại"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item  label="Tác vụ :">
            <Button htmlType="submit">{isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddGenre;

import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router";
import { IGenre, getGenreById, updateGenre } from "../../../api/genre";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
type FieldType = {
  name?: string;
};
const EditGenre = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [genre, setGenre] = useState<IGenre>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getGenreById(id);
        setGenre(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    setFields();
  }, [genre]);
  const setFields = () => {
    form.setFieldsValue({
      id: genre?.id,
      name: genre?.name,
    });
  };

  const onFinish = (values) => {
    updateGenre({ id: id, ...values })
    .then(async () => {
      form.resetFields();
      await swal("Thành công!", "Cập nhật thể loại thành công!", "success");
      navigate("/admin/genres");
    })
    .catch(() => {
      swal("Thất bại!", "Cập nhật thể loại thất bại , Vui lòng thử lại !", "error");
    });
  };

  return (
    <>
      <div>
        <h1 className="text-4xl m-6">Cập nhật thể loại phim</h1>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Tên thể loại"
            name="name"
            rules={[{ required: true, message: "Tên không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Tác vụ :">
            <Button htmlType="submit">
              <VerticalAlignTopOutlined />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditGenre;

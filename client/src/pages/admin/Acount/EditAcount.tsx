import React, { useEffect } from "react";
import { Button, Form, Input,  } from "antd";
import { useNavigate, useParams } from "react-router";
import { Select } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from 'sweetalert';
import { useGetAcounteByIdQuery, useUpdateAcountMutation } from "../../../redux/api/acountApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  name: string;
  email: string;
  password: string;
  role: string;
};
const EditAcount = () => {
  const { id } = useParams();
  const {data:acount} = useGetAcounteByIdQuery(id|| "")
  const [updateAcount , {isLoading}] = useUpdateAcountMutation()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  
  useEffect(() => {
    setFields();
  }, [acount]);
  const setFields = () => {
    form.setFieldsValue({
      id: acount?.data?.id,
      name: acount?.data?.name,
      email: acount?.data?.email,
      password: acount?.data?.password,
      role: acount?.data?.role,
    });
  };
  const onFinish = (values) => {
    console.log(values);
    
    updateAcount({ id: id, ...values })
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Cập nhật tài khoản thành công!", "success");
        navigate("/admin/acountUser");
      })
      .catch(() => {
        swal("Thất bại!", "Tài khoản đã tồn tại , Vui lòng thử lại !", "error");
      });
  };

  
  return (
    <>
      <div>
        <h1 className="text-4xl mb-6 bg-white p-4 rounded-md shadow-md">Cập nhật tài khoản</h1>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="bg-white p-2 rounded-md shadow-md"
        >
          <Form.Item<FieldType>
            label="Tên tài khoản"
            name="name"
            rules={[
              { required: true, message: "Tên tài khoản không được để trống" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            className="hidden"
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Vai trò"
            name="role"
            rules={[{ required: true, message: "Vai trò không được để trống" }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "user",
                  label: "user",
                },
                {
                  value: "admin",
                  label: "admin",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Tác vụ :">
            <Button htmlType="submit">
            {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditAcount;

import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

const UpdateShowTime = () => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const data  = {
    movie_id: "1",
    start_time: "2023/11/01",
    end_time: "2023/10/12",
  };
  // console.log('format date: ', dayjs(data.start_time))
  useEffect(() => {
    form.setFieldsValue({
      movie_id: data.movie_id,
      start_time: dayjs(data.start_time),
      end_time: dayjs(data.end_time),
    });
  }, [data]);
  const onFinish = ({ start_time, end_time, movie_id }: any) => {
    console.log(
      "value finish: ",
      dayjs(start_time).format(dateFormat),
      dayjs(end_time).format(dateFormat),
      movie_id
    );
    // console.log("formate date: ", dayjs(value.start_time).format(dateFormat));
  };
  return (
    <div>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name={"movie_id"}
          label={"Id Movie"}
          rules={[
            { message: "Trường id không được để trống! ", required: true },
          ]}
          style={{ width: 200 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"start_time"}
          label={"Start time"}
          rules={[
            {
              message: "Trường start time không được để trống! ",
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name={"end_time"}
          label={"End time"}
          rules={[
            {
              message: "Trường end time không được để trống! ",
              required: true,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button icon={<VerticalAlignTopOutlined />} htmlType="submit" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateShowTime;

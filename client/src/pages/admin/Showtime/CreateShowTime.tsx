import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const CreateShowTime = () => {
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const dateFormat = 'YYYY/MM/DD';
  const onFinish = (value: any) => {
    console.log("value finish: ", value);
    console.log('formate date: ', dayjs(value.start_time).format(dateFormat))
  };
  return (
    <div>
      <h3>Create Show Time</h3>
      <Form layout="vertical" onFinish={onFinish}>
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
          <DatePicker
            // onChange={(date, dateString) => {
            //   console.log('date: ', date?.$d)
            //   setStartTime(dateString)
            // }}
            // value={dayjs("2023/01/09",dateFormat)}
          />
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
          <DatePicker
          //  onChange={(date, dateString) => {
          //   console.log('date: ', date?.$d) 
          //   setEndTime(dateString)}} 
          // value={dayjs("2023/06/06",dateFormat)}
            />
        </Form.Item>
        <Form.Item>
          <Button icon={<VerticalAlignTopOutlined />} htmlType="submit" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateShowTime;

import { VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  TimePicker,
  notification,
} from "antd";
import { useEffect } from "react";
import {
  useGetByIdShowTimeQuery,
  useUpdateShowTimeMutation,
} from "../../../redux/api/showTimeApi";
import { useParams } from "react-router";
import dayjs from "dayjs";
import IsLoading from "../../../utils/IsLoading";

const UpdateShowTime = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [updateShowTime, { isLoading, error }] = useUpdateShowTimeMutation();
  const { data }: any = useGetByIdShowTimeQuery(id);
  useEffect(() => {
    (async () => {
      await form.setFieldsValue({
        movie_id: data?.data.movie_id,
        room_id: data?.data.room_id,
        show_date: dayjs(data?.data?.show_date, "YYYY/MM/DD"),
        start_time: dayjs(data?.data?.start_time, "HH:mm:ss"),
        end_time: dayjs(data?.data?.end_time, "HH:mm:ss"),
      });
    })();
  }, [data?.data, form]);
  useEffect(() => {
    if (error) {
      return;
    }
  }, [error]);
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  const onFinish = ({
    start_time,
    end_time,
    movie_id,
    room_id,
    show_date,
  }: any) => {
    updateShowTime({
      start_time: dayjs(start_time).format("HH:mm:ss"),
      end_time: dayjs(end_time).format("HH:mm:ss"),
      movie_id,
      room_id,
      show_date: dayjs(show_date).format("YYYY/MM/DD"),
      id,
    }).then(() => {
      // console.log("value: ", values);
      notification.success({ message: "update showtime successfully" });
    });
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
          name={"room_id"}
          label={"ID Room"}
          rules={[
            { message: "Trường room_id không được để trống! ", required: true },
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
          <TimePicker format="HH:mm:ss" />
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
          <TimePicker format="HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name={"show_date"}
          label={"Ngày chiếu"}
          rules={[
            {
              message: "Trường show_date không được để trống! ",
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

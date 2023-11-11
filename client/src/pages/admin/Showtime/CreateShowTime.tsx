import { VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Spin,
  TimePicker,
  notification,
} from "antd";
import { useCreateShowTimeMutation } from "../../../redux/api/showTimeApi";
import { IShowTime } from "../../../interfaces/showtime";
import dayjs from "dayjs";

const CreateShowTime = () => {
  const [createShowTime, { isLoading, error }] = useCreateShowTimeMutation();
  const timeFormat = "HH:mm:ss";
  const dateFormat = "YYYY/MM/DD";
  const onFinish = ({
    movie_id,
    room_id,
    start_time,
    end_time,
    show_date,
  }: IShowTime) => {
    // console.log('start time: ',moment(start_time);
    createShowTime({
      movie_id,
      room_id,
      start_time: dayjs(start_time).format(timeFormat),
      end_time: dayjs(end_time).format(timeFormat),
      show_date: dayjs(show_date).format(dateFormat),
    }).then(() => {
      return notification.success({ message: "Create show time sucessfuly!" });
    });
  };
  console.error('error crate showtime: ',error)
  return (
    <div >
      <h3>Create Show Time</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name={"room_id"}
          label={"Phòng chiếu"}
          rules={[
            { message: "Trường room id không được để trống! ", required: true },
          ]}
          style={{ width: 200 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"movie_id"}
          label={"Chọn phim"}
          rules={[
            {
              message: "Trường movie_id không được để trống! ",
              required: true,
            },
          ]}
          style={{ width: 200 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"start_time"}
          label={"Giờ chiếu"}
          rules={[
            {
              message: "Trường start time không được để trống! ",
              required: true,
            },
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          name={"end_time"}
          label={"Giờ kết thúc"}
          rules={[
            {
              message: "Trường end time không được để trống! ",
              required: true,
            },
          ]}
        >
          <TimePicker />
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
          <Button htmlType="submit">
            {isLoading ? <Spin /> : <VerticalAlignTopOutlined />}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateShowTime;

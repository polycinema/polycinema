import { VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Select,
  Spin,
  TimePicker,
  notification,
} from "antd";
import { useCreateShowTimeMutation } from "../../../redux/api/showTimeApi";
import { IShowTime } from "../../../interfaces/showtime";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetAllMoviesQuery } from "../../../redux/api/movieApi";
import { getAllRoom } from "../../../api/room";
import { useNavigate } from "react-router";

const CreateShowTime = () => {
  const [createShowTime, { isLoading, error }] = useCreateShowTimeMutation();
  const { data, error: errorMovie }: any = useGetAllMoviesQuery();
  const [roomData, setRoomData] = useState();
  const [movieData, setMovieData] = useState();
  const navigate = useNavigate();
  const timeFormat = "HH:mm:ss";
  const dateFormat = "YYYY/MM/DD";

  useEffect(() => {
    (async () => {
      try {
        const { data: ListRoom } = await getAllRoom();
        setRoomData(ListRoom.data);
        setMovieData(data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data]);
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
    })
      .unwrap()
      .then(() => {
        try {
          notification.success({
            message: "Create show time sucessfuly!",
          });
          navigate("/admin/showtime");
        } catch (error) {
          console.error("error create showtime: ", error);
        }
      });
  };
  if (error) {
    console.error("error create showtime: ", error);
  }
  if (errorMovie) {
    console.error("error list movie: ", errorMovie);
  }

  return (
    <div>
      <h3 className="my-3">Thêm Lịch Chiếu</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name={"room_id"}
          label={"Phòng chiếu"}
          rules={[
            { message: "Trường room không được để trống! ", required: true },
          ]}
          style={{ width: 200 }}
        >
          <Select
            style={{ width: 120 }}
            placeholder="Select to room"
            options={roomData?.map((items: any) => {
              return {
                value: items.id,
                label: items.room_name,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name={"movie_id"}
          label={"Chọn phim"}
          rules={[
            {
              message: "Trường movie không được để trống! ",
              required: true,
            },
          ]}
          style={{ width: 200 }}
        >
          <Select
            style={{ width: 120 }}
            placeholder="Select to movie"
            options={movieData?.map((items: any) => {
              return {
                value: items.id,
                label: items.name,
              };
            })}
          />
        </Form.Item>
        <Form.Item
          name={"start_time"}
          label={"Giờ chiếu"}
          rules={[
            {
              message: "Trường Giờ chiếu không được để trống! ",
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
              message: "Trường Giờ kết thúc không được để trống! ",
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, values) {
                const startTime = getFieldValue('start_time');
          
                if (!values || (startTime && startTime.isBefore(values))) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(new Error('Giờ kết thúc phải sau giờ chiếu'));
                }
              },
            })
          ]}
        >
          <TimePicker />
        </Form.Item>
        <Form.Item
          name={"show_date"}
          label={"Ngày chiếu"}
          rules={[
            {
              message: "Trường ngày chiếu không được để trống! ",
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

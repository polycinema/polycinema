import { VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Select,
  TimePicker,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import {
  useGetByIdShowTimeQuery,
  useUpdateShowTimeMutation,
} from "../../../redux/api/showTimeApi";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import IsLoading from "../../../utils/IsLoading";
import { useGetAllMoviesQuery } from "../../../redux/api/movieApi";
import { getAllRoom } from "../../../api/room";

const UpdateShowTime = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [updateShowTime, { isLoading, error }] = useUpdateShowTimeMutation();
  const { data }: any = useGetByIdShowTimeQuery(id);
  const { data: MovieData, error: errorMovie }: any = useGetAllMoviesQuery();
  const [roomData, setRoomData] = useState();
  const [movieData, setMovieData] = useState();
  const navigate = useNavigate();

  console.log("data update ", data);
  useEffect(() => {
    (async () => {
      try {
        const { data: ListRoom } = await getAllRoom();
        setRoomData(ListRoom.data);
        setMovieData(MovieData?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [MovieData]);
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

  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  if (errorMovie) {
    notification.error({ message: "Get list movie error!" });
    console.error("error get list movie: ", error);
  }
  if (error) {
    notification.error({ message: "Update showtime error!" });
    console.error("error update showtime: ", error);
  }
  const onFinish = ({
    start_time,
    end_time,
    movie_id,
    room_id,
    show_date,
  }: any) => {
    // console.log('room_id: ',room_id)
    // console.log('movie_id: ',movie_id)
    updateShowTime({
      start_time: dayjs(start_time).format("HH:mm:ss"),
      end_time: dayjs(end_time).format("HH:mm:ss"),
      movie_id,
      room_id,
      show_date: dayjs(show_date).format("YYYY/MM/DD"),
      id,
    })
      .unwrap()
      .then(() => {
        try {
          notification.success({ message: "update showtime successfully" });
          navigate("/admin/showtime");
        } catch (error) {
          console.error("error update showtime: ", error);
        }
      });
  };
  return (
    <div>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name={"movie_id"}
          label={"Movie"}
          rules={[
            { message: "Trường movie không được để trống! ", required: true },
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
          name={"room_id"}
          label={"Room"}
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

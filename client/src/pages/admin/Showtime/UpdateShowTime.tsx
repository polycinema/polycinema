import { VerticalAlignTopOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Select,
  TimePicker,
} from "antd";
import { useEffect } from "react";
import {
  useGetByIdShowTimeQuery,
  useUpdateShowTimeMutation,
} from "../../../redux/api/showTimeApi";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import IsLoading from "../../../utils/IsLoading";
import { useGetAllMoviesQuery } from "../../../redux/api/movieApi";
import swal from "sweetalert";
import { useGetAllRoomsQuery } from "../../../redux/api/roomApi";

const UpdateShowTime = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [updateShowTime, { isLoading }] = useUpdateShowTimeMutation();
  const { data }: any = useGetByIdShowTimeQuery(id);
  const { data: MovieData, error: errorMovie }: any = useGetAllMoviesQuery();
  const {data:rooms} = useGetAllRoomsQuery()
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await form.setFieldsValue({
        movie_id: data?.data.movie_id,
        room_id: data?.data.room_id,
        show_date: dayjs(data?.data?.show_date, "YYYY/MM/DD"),
        start_time: dayjs(data?.data?.start_time, "HH:mm:ss"),
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
  
  const onFinish = ({ start_time, movie_id, room_id, show_date }: any) => {
    updateShowTime({
      start_time: dayjs(start_time).format("HH:mm:ss"),
      movie_id,
      room_id,
      show_date: dayjs(show_date).format("YYYY/MM/DD"),
      id,
    })
      .unwrap()
      .then(async () => {
        form.resetFields()
        await swal("Thành công!", "Cập nhật lịch chiếu thành công!", "success");
        navigate("/admin/showtime");
      })
      .catch((err) => {
        swal("Thất bại!",`${err.message}`, "error");
      })
  };
  return (
    <div>
      <h1 className="bg-white p-4 rounded-md shadow-md my-4 text-4xl">Cập nhật lịch chiếu</h1>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        className="bg-white p-4 rounded-md shadow-md"
      >
        <Form.Item
          name={"movie_id"}
          label={"Movie"}
          rules={[
            { message: "Trường movie không được để trống! ", required: true },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Select to movie"
            options={MovieData?.data?.filter(item=> item.status != "upcoming").map((items: any) => {
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
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Select to room"
            options={rooms?.data?.map((items: any) => {
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
          <TimePicker style={{ width: "100%" }} format="HH:mm:ss" />
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
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Tác vụ">
          <Button icon={<VerticalAlignTopOutlined />} htmlType="submit" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateShowTime;

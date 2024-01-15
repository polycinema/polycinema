// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Select } from "antd";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IRoom, getRoomById, updateRoom } from "../../../api/room";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import {
  useGetRoomByIdQuery,
  useUpdateRoomMutation,
} from "../../../redux/api/roomApi";
import { useGetAllSeatTypeQuery } from "../../../redux/api/seatApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type FieldType = {
  room_name?: string;
  single_seat?: number;
  double_seat?: number;
  special_seat?: number;
  single_seat_price?: number;
  double_seat_price?: number;
  special_seat_price?: number;
};
const EditRoom = () => {
  const { id } = useParams();
  const { data: room } = useGetRoomByIdQuery(id || "");
  const { data: seat_type } = useGetAllSeatTypeQuery();
  const [updateRoom, {isLoading}] = useUpdateRoomMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState();
  useEffect(() => {
    form.setFieldsValue({
      id: room?.id,
      room_name: room?.data?.room_name,
      seat_type: room?.data?.seat_types?.map((item) => item?.id),
    });
  }, [room]);

  const onFinish = (values) => {
    if (selectValue === undefined) {
      const seatType = room?.data?.seat_types?.map((item) => {
        return {
          id: item.id,
          quantity: item.pivot.quantity,
        };
      });
      updateRoom({
        id,
        seat_types: seatType,
        room_name: values.room_name,
      })
      .unwrap()
        .then(async () => {
          form.resetFields();
          await swal("Thành công!", "Cập nhật phòng thành công!", "success");
          navigate("/admin/rooms");
        })
        .catch(() => {
          swal(
            "Thất bại!",
            "Cập nhật phòng thất bại, Vui lòng thử lại !",
            "error"
          );
        });
    } else {
      const seatType = selectValue?.map((item) => {
        return {
          id: item.value,
          quantity: values[item.label],
        };
      });
      updateRoom({
        id,
        seat_types: seatType,
        room_name: values.room_name,
      })
      .unwrap()
        .then(async () => {
          form.resetFields();
          await swal("Thành công!", "Cập nhật phòng thành công!", "success");
          navigate("/admin/rooms");
        })
        .catch(() => {
          swal(
            "Thất bại!",
            "Cập nhật phòng thất bại, Vui lòng thử lại !",
            "error"
          );
        });
    }
  };
  const handleChange = (value, option) => {
    setSelectValue(option);
  };
  return (
    <>
      <div className="addFilmAdmin">
        <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">
          Cập nhật phòng
        </h2>
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="bg-white p-4 rounded-md shadow-md"
        >
          <Form.Item<FieldType>
            label="Tên phòng"
            name="room_name"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại ghế"
            name="seat_type"
            rules={[{ required: true, message: "Please input your room!" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={seat_type?.data?.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          {selectValue?.map((value) => (
            <Form.Item<FieldType>
              key={value.value}
              label={`Số lượng ghế ${value.label}`}
              name={`${value?.label}`}
              rules={[{ required: true, message: "Please input your room!" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          ))}
          <Form.Item label="Tác vụ">
            <>
              <Button htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <VerticalAlignTopOutlined />
              )}{" "}
              </Button>
            </>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default EditRoom;

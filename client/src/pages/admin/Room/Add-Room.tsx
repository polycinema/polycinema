// import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Select } from "antd";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import { useGetAllSeatTypeQuery } from "../../../redux/api/seatApi";
import { useState } from "react";
import { useAddRoomMutation } from "../../../redux/api/roomApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type FieldType = {
  room_name?: string;
  seat_types?: [];
  row?: number;
  column?: number;
};
const AddRoom = () => {
  const { data: seat_type } = useGetAllSeatTypeQuery();
  const [addRoom, { isLoading }] = useAddRoomMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState();
  const onFinish = (values) => {
    const seatType = selectValue?.map((item) => {
      return {
        id: item.value,
        quantity: values[item.label],
      };
    });
    addRoom({
      seat_types: seatType,
      room_name: values.room_name,
    }).unwrap()
      .then(async () => {
        form.resetFields();
        await swal("Thành công!", "Thêm phòng thành công!", "success");
        navigate("/admin/rooms");
      })
      .catch((e) => {
        
        swal("Thất bại!", `Thêm phòng thất bại, ${e.data.errors.room_name[0]} !`, "error");
      });
  };
  const handleChange = (value, option) => {
    setSelectValue(option);
  };

  return (
    <div className="addFilmAdmin">
      <h2 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">
        Thêm Phòng mới{" "}
      </h2>
      <Form
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
        <Form.Item label="Loại ghế" name="seat_type">
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
            key={value}
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
  );
};
export default AddRoom;

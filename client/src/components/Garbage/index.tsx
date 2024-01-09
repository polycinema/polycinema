import { Badge, Button, Modal, Popconfirm, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import { FaTrashRestore } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";

import { MdAutoDelete } from "react-icons/md";
import { useGetBookingsSoftQuery, useSoftDeleteBookingMutation } from "../../redux/api/checkoutApi";
import { RootBooking } from "../../interfaces/booking";
import { QuestionCircleOutlined } from "@ant-design/icons";
const GarbageComponent = () => {
  const [
    restoreBooking,
    { isLoading: loadingrestoreBooking, error: errRestoreBooking },
  ] = useSoftDeleteBookingMutation();
  const {data,error} = useGetBookingsSoftQuery()
  const [bookingsSoft,setbookingsSoft] = useState<RootBooking[]>()
  const [countBookingSoft,setCountBookingSoft] = useState(0)
  console.log("bookingsSoft: ", bookingsSoft);
  useEffect(()=>{
    if(bookingsSoft){
      setCountBookingSoft(bookingsSoft.length)
    }
  },[bookingsSoft])
  useEffect(()=>{
    if(data){
      setbookingsSoft(data.data)
    }
  },[data])
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  if(error){
    console.error('error GetBookingSoft: ',error);
  }
  if(errRestoreBooking){
    console.error('error errRestoreBooking: ',errRestoreBooking);
  }
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const dataSource = bookingsSoft?.map((items)=> {
    return {
      key: items.id,
      booking_id: items.booking_id,
      nameMovie: items.showtime.movie.name
    }
  })

  const columns = [
    {
      title: "Đơn Hàng",
      dataIndex: "booking_id",
      key: "booking_id",
    },
    {
      title: "Tên Phim",
      dataIndex: "nameMovie",
      key: "nameMovie",
    },
    {
      title: "Hành Động",
      dataIndex: "action",
      key: "action",
      render: (_: any, { key: id }: any) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục vé đặt"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreBooking({booking_id: id})
                .unwrap()
                .then(() => {
                  notification.success({
                    message: "Restore booking sucessfuly!",
                  });
                })
            }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
          <Popconfirm
            title="Xóa vé đặt vĩnh viễn"
            description="Bạn có chắc muốn xóa?"
            // onConfirm={() =>
            //   softDeleteBooking({booking_id: id})
            //     .unwrap()
            //     .then(() => {
            //       notification.success({
            //         message: "Delete booking sucessfuly!",
            //       });
            //       dispatch(setBookingSoftDelete(_))
            //     })
            // }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button icon={<FcDeleteDatabase />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Badge count={countBookingSoft} size="small">
        <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
          Thùng rác
        </Button>
      </Badge>
      <Modal
        title="Thùng rác"
        open={isModalOpenGarbage}
        onCancel={handleCancelGarbage}
        footer={null}
      >
        <Table dataSource={dataSource} columns={columns} />;
      </Modal>
    </>
  );
};

export default GarbageComponent;


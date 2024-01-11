import { Badge, Button, Modal, Popconfirm, Table, notification } from "antd";
import {
  useGetShowTimeSoftQuery,
  useGetShowTimesQuery,
  useSoftDeleteShowtimeMutation,
} from "../../../redux/api/showTimeApi";
import { IShowtime } from "../../../interfaces/showtime";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditFilled, QuestionCircleOutlined } from "@ant-design/icons";
import IsLoading from "../../../utils/IsLoading";
import { useEffect, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";

const ShowTimeMng = () => {
  const { data, isLoading, error }: any = useGetShowTimesQuery();
  const [showtime, setShowtime] = useState([]);
  const { data:dataShowtimeSoft, error:errShowtimeSoft }: any = useGetShowTimeSoftQuery();
  const [softDeleteShowtime, {error: ErrorSoftDeleteShowtime}] = useSoftDeleteShowtimeMutation();
  const [restoreShowtime, {error: RestoreSoftDeleteShowtime}] = useSoftDeleteShowtimeMutation();
  const [showtimeSoftDelete, setShowtimeSoftDelete] = useState([]);
  const [countShowtimeSoft, setCountShowtimeSoft] = useState(0);
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  console.log('showtimeSoftDelete: ',showtimeSoftDelete)
  useEffect(() => {
    if (showtimeSoftDelete) {
      setCountShowtimeSoft(showtimeSoftDelete.length);
    }
  }, [showtimeSoftDelete]);
  useEffect(() => {
    if (dataShowtimeSoft) {
      setShowtimeSoftDelete(dataShowtimeSoft.data);
    }
  }, [dataShowtimeSoft]);
  useEffect(() => {
    if (data) {
      setShowtime(data.data);
    }
  }, [data]);
  if (ErrorSoftDeleteShowtime) {
    notification.error({ message: "Removie showtime error!" });
    console.error("error remove: ", ErrorSoftDeleteShowtime);
  }
  if (errShowtimeSoft) {
    notification.error({ message: "Get showtime soft error!" });
    console.error("error Get showtime soft: ", errShowtimeSoft);
  }
  if (error) {
    notification.error({ message: "Get showtime error!" });
    console.error("error list showtime: ", error);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const dataSource: IShowtime[] = showtime?.map((items: IShowtime) => {
    return {
      key: items.id,
      room_id: items?.room?.room_name,
      movie_id: items?.movie.name,
      start_time: items?.start_time,
      show_date: items?.show_date,
    };
  });
  const dataSourceSoft: IShowtime[] = showtimeSoftDelete?.map((items:IShowtime)=> {
    return {
      key: items.id,
      room_id: items?.room?.room_name,
      movie_id: items?.movie.name,
      start_time: items?.start_time,
      show_date: items?.show_date,
    }
  })
  const columnsSoftDelete: any[] = [
    {
      title: "Phòng chiếu",
      dataIndex: "room_id",
      key: "1",
    },
    {
      title: "Phim",
      dataIndex: "movie_id",
      key: "2",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "3",
    },
    {
      title: "Ngày chiếu",
      dataIndex: "show_date",
      key: "5",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "6",
      render: (_: any, { key: id }: any) => {
        return (
          <div className="space-x-3">
             <Popconfirm
            title="Khôi phục lịch chiếu"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreShowtime({showtime_id: id})
                .unwrap()
                .then(() => {
                  notification.success({
                    message: "Restore showtime sucessfuly!",
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
        );
      },
    },
  ];
  const columns: any[] = [
    {
      title: "Phòng chiếu",
      dataIndex: "room_id",
      key: "1",
    },
    {
      title: "Phim",
      dataIndex: "movie_id",
      key: "2",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "3",
    },
    {
      title: "Ngày chiếu",
      dataIndex: "show_date",
      key: "5",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "6",
      render: (_: any, { key: id }: any) => {
        return (
          <div className="space-x-3">
            <Link to={`/admin/showtime/${id}/edit`}>
              <Button type="text" className="text-blue-500">
                <EditFilled />
              </Button>
            </Link>
            <Popconfirm
              title="Xóa lịch chiếu"
              description="Bạn có chắc muốn xóa?"
              onConfirm={() =>
                softDeleteShowtime({showtime_id: id})
                  .unwrap()
                  .then(() => {
                    notification.success({
                      message: "Delete showtime sucessfuly!",
                    });
                  })
              }
              okText="Yes"
              okType="default"
              cancelText="No"
            >
              <Button type="text" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="md:flex justify-between items-center">
        <Button>
          <Link to={"/admin/showtime/add"}>Thêm Lịch Chiếu</Link>
        </Button>
        <div className="">
        <Badge count={countShowtimeSoft} size="small">
        <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
          Thùng rác
        </Button>
      </Badge>
      <Modal
        title="Thùng rác"
        open={isModalOpenGarbage}
        onCancel={handleCancelGarbage}
        footer={null}
        width={700}
      >
        <Table dataSource={dataSourceSoft} columns={columnsSoftDelete} />;
      </Modal>
        </div>
      </div>
      <h1 className="text-2xl my-6 bg-white p-4 rounded-md shadow-md ">Danh sách lịch chiếu</h1>
      <Table dataSource={dataSource} columns={columns} className="bg-white p-4 rounded-md shadow-md" />
    </div>
  );
};

export default ShowTimeMng;

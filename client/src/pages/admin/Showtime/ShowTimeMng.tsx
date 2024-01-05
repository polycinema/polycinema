import { Button, Popconfirm, Table, notification } from "antd";
import {
  useGetShowTimesQuery,
  useRemoveShowTimeMutation,
} from "../../../redux/api/showTimeApi";
import { IShowtime } from "../../../interfaces/showtime";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import IsLoading from "../../../utils/IsLoading";
import { useEffect, useState } from "react";
import GarbageComponent from "../../../components/Garbage";

const ShowTimeMng = () => {
  const { data, isLoading, error }: any = useGetShowTimesQuery();
  const [removeShowtime, { error: ErrorRemove }] = useRemoveShowTimeMutation();
  const [showtime, setShowtime] = useState([]);
  useEffect(() => {
    if (data) {
      setShowtime(data.data);
    }
  }, [data]);
  console.log("showtime: ", showtime);
  if (ErrorRemove) {
    notification.error({ message: "Removie showtime error!" });
    console.error("error remove: ", ErrorRemove);
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

  const dataSource: IShowtime[] = showtime?.map((items: IShowtime) => {
    return {
      key: items.id,
      room_id: items?.room?.room_name,
      movie_id: items?.movie.name,
      start_time: items?.start_time,
      show_date: items?.show_date,
    };
  });
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
                removeShowtime(id)
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
          <GarbageComponent />
        </div>
      </div>
      <h1 className="text-2xl m-6 ">Danh sách lịch chiếu</h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default ShowTimeMng;

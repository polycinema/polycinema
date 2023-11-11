import { Button, Popconfirm, Table } from "antd";
import {
  useGetShowTimesQuery,
  useRemoveShowTimeMutation,
} from "../../../redux/api/showTimeApi";
import { IShowTime } from "../../../interfaces/showtime";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import IsLoading from "../../../utils/IsLoading";

const ShowTimeMng = () => {
  const { data, isLoading, error }: any = useGetShowTimesQuery();
  const [removeShowtime] = useRemoveShowTimeMutation();
  console.log("error: ", error);
  // if (isLoading) {
  // }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }

  const dataSource: IShowTime[] = data?.data?.map(
    ({ room_id, movie_id, start_time, end_time, id, show_date }: IShowTime) => {
      return {
        key: id,
        room_id,
        movie_id,
        start_time,
        end_time,
        show_date,
      };
    }
  );
  // console.log('dataSource: ',dataSource)
  const columns = [
    {
      title: "Room Id",
      dataIndex: "room_id",
      key: "1",
    },
    {
      title: "Movie Id",
      dataIndex: "movie_id",
      key: "2",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "3",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "4",
    },
    {
      title: "Show date",
      dataIndex: "show_date",
      key: "5",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "6",
      render: (_: any, { key: id }: any) => {
        console.log(id);
        return (
          <div className="space-x-3">
            <Link to={`/admin/showtime/${id}/edit`}>
              <Button icon={<EditFilled />} />
            </Link>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => removeShowtime(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Button>
          <Link to={"/admin/showtime/add"}>Create ShowTime</Link>
        </Button>
        <h1 className="text-2xl m-6 ">ShowTime</h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default ShowTimeMng;

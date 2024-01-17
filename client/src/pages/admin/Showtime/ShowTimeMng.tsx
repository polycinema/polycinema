import { Badge, Button, Input, InputRef, Modal, Popconfirm, Space, Table, notification } from "antd";
import {
  useGetShowTimeSoftQuery,
  useGetShowTimesQuery,
  useSoftDeleteShowtimeMutation,
} from "../../../redux/api/showTimeApi";
import { IShowtime } from "../../../interfaces/showtime";
import { Link } from "react-router-dom";
import {  EditFilled, QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import IsLoading from "../../../utils/IsLoading";
import { useEffect, useRef, useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import swal from "sweetalert";
import { FilterConfirmProps } from "antd/es/table/interface";
import { ColumnType } from "antd/es/list";

type DataIndex = keyof DataType;
const ShowTimeMng = () => {
  const { data, isLoading, error }: any = useGetShowTimesQuery();
  const [showtime, setShowtime] = useState([]);
  const { data:dataShowtimeSoft, error:errShowtimeSoft }: any = useGetShowTimeSoftQuery();
  const [softDeleteShowtime, {error: ErrorSoftDeleteShowtime}] = useSoftDeleteShowtimeMutation();
  const [restoreShowtime, {error: ErrRestoreSoftDeleteShowtime}] = useSoftDeleteShowtimeMutation();
  const [showtimeSoftDelete, setShowtimeSoftDelete] = useState([]);
  const [countShowtimeSoft, setCountShowtimeSoft] = useState(0);
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
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
  if (ErrRestoreSoftDeleteShowtime) {
    notification.error({ message: "Err Restore SoftDeleteShowtime!" });
    console.error("Err Restore SoftDeleteShowtime: ", ErrRestoreSoftDeleteShowtime);
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
                  swal("Thành công!", "Khôi phục lịch chiếu thành công!", "success")
                }).catch(()=>{
                  swal("Thất bại!", "Khôi phục lịch chiếu thất bại , Vui lòng thử lại !", "error");
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
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? text : text?.toString(),
  });
  const columns: any[] = [
    {
      title: "Phòng chiếu",
      dataIndex: "room_id",
      key: "1",
      align:"center",
      ...getColumnSearchProps("room_id")
    },
    {
      title: "Phim",
      dataIndex: "movie_id",
      key: "2",
      align:"center",
      ...getColumnSearchProps("movie_id")
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "3",
      align:"center"
    },
    {
      title: "Ngày chiếu",
      dataIndex: "show_date",
      key: "5",
      align:"center"
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      align:"center",
      key: "6",
      render: (_: any, { key: id }: any) => {
        return (
          <div className="space-x-3">
            <Link to={`/admin/showtime/${id}/edit`}>
              <Button icon={<EditFilled />}/>
            </Link>
            <Popconfirm
              title="Ẩn lịch chiếu"
              description="Bạn có chắc muốn Ẩn?"
              onConfirm={() =>
                softDeleteShowtime({showtime_id: id})
                  .unwrap()
                  .then(() => {
                    swal("Thành công!", "Ẩn lịch chiếu thành công!", "success")
                  }).catch(()=>{
                    swal("Thất bại!", "Ẩn lịch chiếu thất bại , Vui lòng thử lại !", "error");
                  })
              }
              okText="Yes"
              okType="default"
              cancelText="No"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
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
        <Table dataSource={dataSourceSoft} columns={columnsSoftDelete} />
      </Modal>
        </div>
      </div>
      <h1 className="text-2xl my-6 text-[#0D5D9F] bg-white p-4 rounded-md shadow-md ">Danh sách lịch chiếu</h1>
      <Table dataSource={dataSource} columns={columns} className="bg-white p-4 rounded-md shadow-md" />
    </div>
  );
};

export default ShowTimeMng;

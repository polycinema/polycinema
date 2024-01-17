import React, { useEffect, useState } from "react";

import {
  Badge,
  Button,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { MdAutoDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import {
  useGetAllDirectorsQuery,
  useGetDirectorSoftQuery,
  useSoftDeleteDirectorMutation,
} from "../../../redux/api/directorApi";
import IsLoading from "../../../utils/IsLoading";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FcDeleteDatabase } from "react-icons/fc";
import swal from "sweetalert";

interface DataType {
  key: string;
  name: string;
  imgae: string;
}
const ListDirector = () => {
  const { data: director, isLoading, error } = useGetAllDirectorsQuery();
  const { data: Softdirector } = useGetDirectorSoftQuery();
  const [SoftDeleteDirector, { error: errSoftDeleteDirector }] =
    useSoftDeleteDirectorMutation();
  const [RestoreDirector, { error: errRestoreDirector }] =
    useSoftDeleteDirectorMutation();
  const [directors, setDirectors] = useState<IDirector[]>();
  const [softDirectors, setSoftDirectors] = useState<IDirector[]>();
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const [countDirector, setCountDirector] = useState(0);
  // console.log("softDirectors: ", softDirectors);
  useEffect(() => {
    if (softDirectors) {
      setCountDirector(softDirectors.length);
    }
  }, [softDirectors]);
  useEffect(() => {
    if (Softdirector) {
      setSoftDirectors(Softdirector.data);
    }
  }, [Softdirector]);
  useEffect(() => {
    if (director) {
      setDirectors(director.data);
    }
  }, [director]);
  if (errRestoreDirector) {
    console.error("errRestoreDirector: ", errRestoreDirector);
  }
  if (error) {
    console.error("error directors: ", error);
  }
  if (errSoftDeleteDirector) {
    console.error("errSoftDeleteDirector: ", errSoftDeleteDirector);
  }
  if (isLoading) {
    <>
      <IsLoading />
    </>;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên đạo diễn",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ảnh đạo diễn",
      dataIndex: "image",
      align: "center",
      key: "image",
      render: (img) => <img className="w-40 mx-auto" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/director/${id}/edit`}>
            <Button icon={<AiFillEdit />} />
          </Link>
          <div>
            <Popconfirm
              title="Ẩn đạo diễn"
              description="Bạn có chắc chắn muốn ẩn đạo diễn"
              onConfirm={() => {
                SoftDeleteDirector({ director_id: id }).then(() => {
                  setDirectors(
                    directors?.filter((item) => item.id !== id)
                  );
                  swal("Thành công!", "Ẩn đạo diễn thành công!", "success")
                }).catch(()=>{
                  swal("Thất bại!", "ẨN đạo diễn thất bại , Vui lòng thử lại !", "error");
                });
              }}
              okText="Có"
              cancelText="Không"
              okType="default"
            >
              <Button className="text-blue-500" icon={<FaEyeSlash />} />
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];
  const columnsSoftDirectors: ColumnsType<DataType> = [
    {
      title: "Tên đạo diễn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh đạo diễn",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục đạo diễn"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              RestoreDirector({ director_id: id })
                .unwrap()
                .then(() => {
                  swal("Thành công!", "Khôi phục đạo diễn thành công!", "success")
                }).catch(()=>{
                  swal("Thất bại!", "Khôi phục đạo diễn thất bại , Vui lòng thử lại !", "error");
                })
            }
            okText="Yes"
            okType="default"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FaTrashRestore />} />
          </Popconfirm>
          <Popconfirm
            title="Xóa đạo diễn vĩnh viễn"
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
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FcDeleteDatabase />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const data: DataType[] = directors?.map((item: IDirector) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
    };
  });
  const dataSoftdirector: DataType[] = softDirectors?.map((item: IDirector) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
    };
  });
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  return (
    <>
      <div>
        <div className="md:flex justify-between items-center">
          <Button>
            <Link to={"/admin/director/add"}>Thêm đạo diễn</Link>
          </Button>
          <div className="">
            <Badge count={countDirector} size="small">
              <Button icon={<MdAutoDelete />} onClick={OpentModalGarbage}>
                Thùng rác
              </Button>
            </Badge>
            <Modal
              title="Thùng rác"
              open={isModalOpenGarbage}
              onCancel={handleCancelGarbage}
              footer={null}
              width={800}
            >
              <Table
                dataSource={dataSoftdirector}
                columns={columnsSoftDirectors}
              />
            </Modal>
          </div>
        </div>
        <h1 className="text-2xl mb-6 mt-2 bg-white p-4 rounded-md shadow-md text-[#0D5D9F]">
          Danh sách đạo diễn
        </h1>
        <Table
          columns={columns}
          dataSource={data}
          className="bg-white p-4 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ListDirector;

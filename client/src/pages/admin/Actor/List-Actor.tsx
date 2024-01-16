import React, { useEffect, useState } from "react";
import { Badge, Button, Modal, Popconfirm, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import {
  useGetAllActorQuery,
  useGetSoftActorQuery,
  useSoftDeleteActorMutation,
} from "../../../redux/api/actorsApi";
import IsLoading from "../../../utils/IsLoading";
import swal from "sweetalert";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
interface DataType {
  key: string;
  name: string;
  image: string;
  date_of_birth: string;
}
const ListActor = () => {
  const { data: actor, isLoading, error } = useGetAllActorQuery();
  const [softDeleteActor] = useSoftDeleteActorMutation();
  const [restoreActor] = useSoftDeleteActorMutation();
  const { data: softActor, error: errSoftActor } = useGetSoftActorQuery();
  const [softActors, setsoftActors] = useState();
  const [actors, setActors] = useState();
  const [CountActors, setCountActors] = useState(0);
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);

  useEffect(() => {
    if (softActors) {
      setCountActors(softActors.length);
    }
  }, [softActors]);
  useEffect(() => {
    if (softActor) {
      setsoftActors(softActor.data);
    }
  }, [softActor]);
  useEffect(() => {
    if (actor) {
      setActors(actor.data);
    }
  }, [actor]);
  if (errSoftActor) {
    console.error("errSoftActor: ", errSoftActor);
  }
  if (error) {
    console.error("error get all actors: ", error);
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên diễn viên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ảnh diễn viên",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (img) => <img className="w-40 mx-auto" src={img} alt="anh" />,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      align: "center",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/actors/${id}/edit`}>
            <Button icon={<MdEdit/>}/>
          </Link>
          <div>
            <Popconfirm
              title="Ẩn diễn viên"
              description="Bạn có chắc chắn muốn Ẩn diễn viên"
              onConfirm={() => {
                softDeleteActor({ actor_id: id })
                  .then(() => {
                    swal("Thành công!", "Ẩn diễn viên thành công!", "success");
                  })
                  .catch(() => {
                    swal(
                      "Thất bại!",
                      "Ẩn diễn viên thất bại , Vui lòng thử lại !",
                      "error"
                    );
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
  const columnsSoftActor: ColumnsType<DataType> = [
    {
      title: "Tên diễn viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh diễn viên",
      dataIndex: "image",
      key: "image",
      render: (img) => <img className="w-40" src={img} alt="anh" />,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục diễn viên"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreActor({ actor_id: id })
                .unwrap()
                .then(() => {
                  swal(
                    "Thành công!",
                    "Khôi phục diễn viên thành công!",
                    "success"
                  );
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Khôi phục diễn viên thất bại , Vui lòng thử lại !",
                    "error"
                  );
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
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button icon={<FcDeleteDatabase />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const dataSoftActor: DataType[] = softActors?.map((item: IActor) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
      date_of_birth: item?.date_of_birth,
    };
  });
  const data: DataType[] = actors?.map((item: IActor) => {
    return {
      key: item?.id,
      name: item?.name,
      image: item?.image,
      date_of_birth: item?.date_of_birth,
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
      {isLoading ? (
        <IsLoading />
      ) : (
        <div>
          <div className="md:flex justify-between items-center">
            <Link to={"/admin/actors/add"}>
              <Button className="m-4">Thêm diễn viên</Button>
            </Link>
            <div className="">
              <Badge count={CountActors} size="small">
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
                <Table dataSource={dataSoftActor} columns={columnsSoftActor} />
              </Modal>
            </div>
          </div>
          <h1 className="text-2xl mb-6 bg-white p-4 rounded-md shadow-md ">
            Danh sách diễn viên
          </h1>
          <Table
            columns={columns}
            dataSource={data}
            className="bg-white p-4 rounded-md shadow-md"
          />
        </div>
      )}
    </>
  );
};

export default ListActor;

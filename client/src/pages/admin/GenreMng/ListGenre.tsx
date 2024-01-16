import React, { useEffect, useState } from "react";

import { Badge, Button, Modal, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import {
  useGetAllGenresQuery,
  useGetGenresSoftQuery,
  useSoftDeleteGenresMutation,
} from "../../../redux/api/genresApi";
import IsLoading from "../../../utils/IsLoading";
import swal from "sweetalert";
import { MdAutoDelete } from "react-icons/md";
import { FcDeleteDatabase } from "react-icons/fc";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

interface DataType {
  key: string;
  name: string;
}
const ListGenre = () => {
  const { data: Genres, isLoading, error } = useGetAllGenresQuery();
  const { data: SoftGenre } = useGetGenresSoftQuery();
  const [softDeleteGenres, { error: errsoftDeleteGenres }] =
    useSoftDeleteGenresMutation();
  const [restoreGenres, { error: errRestoreGenres }] =
    useSoftDeleteGenresMutation();
  const [genres, setGenres] = useState<IGenre[]>();
  const [SoftGenres, setSoftGenres] = useState<IGenre[]>();
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const [countGenres, setCountGenres] = useState(0);
  console.log("SoftGenres: ", SoftGenres);
  useEffect(() => {
    if (SoftGenres) {
      setCountGenres(SoftGenres.length);
    }
  }, [SoftGenres]);
  useEffect(() => {
    if (SoftGenre) {
      setSoftGenres(SoftGenre.data);
    }
  }, [SoftGenre]);
  useEffect(() => {
    if (Genres) {
      setGenres(Genres.data);
    }
  }, [Genres]);
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  if (errsoftDeleteGenres) {
    console.error("errsoftDeleteGenres: ", errsoftDeleteGenres);
  }
  if (errRestoreGenres) {
    console.error("errRestoreGenres: ", errRestoreGenres);
  }
  if (error) {
    console.error("error genres: ", error);
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/genres/${id}/edit`}>
            <Button icon={<FaEdit />} />
          </Link>
          <div>
            <Popconfirm
              title="Xóa thể loại"
              description="Bạn có chắc chắn muốn xóa thể loại"
              onConfirm={() => {
                softDeleteGenres({ genre_id: id })
                  .then(() => {
                    swal("Thành công!", "Xóa thể loại thành công!", "success");
                  })
                  .catch(() => {
                    swal(
                      "Thất bại!",
                      "Xóa thể loại thất bại , Vui lòng thử lại !",
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

  const dataConfig: DataType[] = genres?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
    };
  });
  const dataSoftGenres: DataType[] = SoftGenres?.map((item) => {
    return {
      key: item?.id,
      name: item?.name,
    };
  });
  const columnsSoftGenres: ColumnsType<DataType> = [
    {
      title: "Tên thể loại",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục thể loại"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreGenres({ genre_id: id })
                .unwrap()
                .then(() => {
                  swal(
                    "Thành công!",
                    "Khôi phục thể loại thành công!",
                    "success"
                  );
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Khôi phục thể loại thất bại , Vui lòng thử lại !",
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
        </div>
      ),
    },
  ];
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
            <Link to={"/admin/genres/add"}>Thêm thể loại</Link>
          </Button>
          <div className="">
            <Badge count={countGenres} size="small">
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
              <Table dataSource={dataSoftGenres} columns={columnsSoftGenres} />
            </Modal>
          </div>
        </div>

        <h1 className="text-2xl mb-6 mt-2 bg-white p-4 rounded-md shadow-md ">
          Danh sách thể loại
        </h1>
        <Table
          columns={columns}
          dataSource={dataConfig}
          className="bg-white p-4 rounded-md shadow-md"
        />
      </div>
    </>
  );
};

export default ListGenre;

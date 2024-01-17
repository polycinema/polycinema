import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, Badge, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  useGetAllMoviesQuery,
  useGetMovieSoftQuery,
  useSoftDeleteMovieMutation,
} from "../../../redux/api/movieApi";
import IsLoading from "../../../utils/IsLoading";
import { MdAutoDelete } from "react-icons/md";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FaEyeSlash, FaTrashRestore } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import swal from "sweetalert";
import { MdEdit } from "react-icons/md";
import { Actor, Genre, IMovie } from "../../../interfaces/movie";
import { ColumnsType } from "antd/es/table";

const MovieTable = () => {
  const { data: movies, isLoading: isLoadingMovies } = useGetAllMoviesQuery();
  const { data: dataMovieSoft, error: errMovieSoft } = useGetMovieSoftQuery();
  const [softDeleteMovie, { error: ErrorSoftDeleteMovie }] =
    useSoftDeleteMovieMutation();
  const [restoreMovie, { error: RestoreSoftDeleteMovie }] =
    useSoftDeleteMovieMutation();
  const [MovieSoftDelete, setMovieSoftDelete] = useState([]);
  const [countMovieSoft, setCountMovieSoft] = useState(0);
  const [isModalOpenGarbage, SetIsModalOpenGarbage] = useState(false);
  const [listMovie, SetListMovie] = useState([]);
  console.log("listMovie: ", listMovie);
  useEffect(() => {
    if (MovieSoftDelete) {
      setCountMovieSoft(MovieSoftDelete.length);
    }
  }, [MovieSoftDelete]);
  useEffect(() => {
    if (dataMovieSoft) {
      setMovieSoftDelete(dataMovieSoft?.data);
    }
  }, [dataMovieSoft]);
  useEffect(() => {
    if (movies) {
      SetListMovie(movies?.data);
    }
  }, [movies]);
  if (RestoreSoftDeleteMovie) {
    console.error("RestoreSoftDeleteMovie: ", RestoreSoftDeleteMovie);
  }
  if (errMovieSoft) {
    console.error("errMovieSoft: ", errMovieSoft);
  }
  if (ErrorSoftDeleteMovie) {
    console.error("ErrorSoftDeleteMovie: ", ErrorSoftDeleteMovie);
  }
  const handleCancelGarbage = () => {
    SetIsModalOpenGarbage(false);
  };
  const OpentModalGarbage = () => {
    SetIsModalOpenGarbage(true);
  };
  const columnsMovieSoft = [
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <span className="line-clamp-1">{name}</span>,
    },

    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      render: (genres: Genre[]) =>
        genres.map((item: Genre, index: number) => (
          <span className="" key={item.id}>
            {item.name}
            {index === genres.length - 1 ? "" : ", "}
          </span>
        )),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <div className="space-x-3">
          <Popconfirm
            title="Khôi phục phim"
            description="Bạn có chắc muốn khôi phục?"
            onConfirm={() =>
              restoreMovie({ movie_id: id })
                .unwrap()
                .then(() => {
                  swal("Thành công!", "Khôi phục phim thành công!", "success");
                })
                .catch(() => {
                  swal(
                    "Thất bại!",
                    "Khôi phục phim thất bại , Vui lòng thử lại !",
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
  const dataSourceMovieSoft = MovieSoftDelete?.map((item: IMovie) => {
    return {
      key: item.id,
      name: item.name,
      genres: item.genres,
      release_date: item.release_date,
      status: item.status,
    };
  });
  const columns: ColumnsType<{
    key: number;
    name: string;
    title: string;
    genres: Genre[];
    image: string;
    trailer: string;
    description: string;
    release_date: string;
    duration: number;
    status: string;
    actors: Actor[];
    director_id: string;
  }> = [
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      align: "center",
      render: (genres: Genre[]) =>
        genres.map((item: Genre, index: number) => (
          <span className="" key={item.id}>
            {item.name}
            {index === genres.length - 1 ? "" : ", "}
          </span>
        )),
    },
    {
      title: "Ảnh phim",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image: string) => (
        <img src={image} alt="Movie Image" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 200,
      fixed: "left",
      align: "center",
      render: (desc: string) => <p className="line-clamp-3">{desc}</p>,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "release_date",
      key: "release_date",
      align: "center",
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      key: "duration",
      align: "center",
    },
    {
      title: "Đạo diễn",
      dataIndex: "director_id",
      key: "director_id",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <p>
          {status === "upcoming"
            ? "Sắp chiếu"
            : status === "screening"
            ? "Đang chiếu"
            : "Đã chiếu"}
        </p>
      ),
      filters: [
        {
          text: "Sắp chiếu",
          value: "upcoming",
        },
        {
          text: "Đang chiếu",
          value: "screening",
        },
        {
          text: "Đã chiếu",
          value: "unscreen",
        },
      ],
      onFilter: (value: string, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Diễn viên",
      dataIndex: "actors",
      key: "actors",
      align: "center",
      render: (actors: Actor[]) =>
        actors.map((item: Actor, index: number) => (
          <span className="" key={item.id}>
            {item.name}
            {index === actors.length - 1 ? "" : ", "}
          </span>
        )),
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Link to={`/admin/movies/${id}/edit`}>
            <Button icon={<MdEdit />} />
          </Link>
          <div>
            <Popconfirm
              title="Xóa phim"
              description="Bạn có chắc chắn muốn xóa phim"
              onConfirm={() => {
                softDeleteMovie({ movie_id: id })
                  .unwrap()
                  .then(() => {
                    swal("Thành công!", "Xóa phim thành công!", "success");
                  })
                  .catch(() => {
                    swal(
                      "Thất bại!",
                      "Xóa phim phim thất bại , Vui lòng thử lại !",
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

  const dataSource = listMovie?.map((item: IMovie) => {
    return {
      key: item.id,
      name: item.name,
      title: item.title,
      genres: item.genres,
      image: item.image,
      trailer: item.trailer,
      description: item.description,
      release_date: item.release_date,
      duration: item.duration,
      status: item.status,
      actors: item.actors,
      director_id: item.director?.name,
    };
  });

  return (
    <>
      {isLoadingMovies ? (
        <IsLoading />
      ) : (
        <div>
          <div className="md:flex justify-between items-center">
            <Button className="m-2">
              <Link to={"/admin/movies/create"}>Thêm Phim Mới</Link>
            </Button>
            <div className="">
              <Badge count={countMovieSoft} size="small">
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
                  dataSource={dataSourceMovieSoft}
                  columns={columnsMovieSoft}
                />
              </Modal>
            </div>
          </div>
          <h1 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md text-[#0D5D9F]">
            Danh sách phim{" "}
          </h1>
          <Table
            dataSource={dataSource}
            columns={columns}
            className="bg-white p-4 rounded-md shadow-md"
          />
        </div>
      )}
    </>
  );
};

export default MovieTable;

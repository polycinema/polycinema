import React from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import {
  useGetAllMoviesQuery,
  useRemoveMovieMutation,
} from "../../../redux/api/movieApi";
import IsLoading from "../../../utils/IsLoading";
import GarbageComponent from "../../../components/Garbage";

const MovieTable = () => {
  const { data: movies, isLoading: isLoadingMovies } = useGetAllMoviesQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const [remove] = useRemoveMovieMutation();
  console.log(movies);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      render: ({ genres }) =>
        genres.map((item) => <span className="m-1">{item.name}</span>),
    },
    {
      title: "Ảnh phim",
      dataIndex: "image",
      key: "image",
      render: (image: any) => (
        <img src={image} alt="Movie Image" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc: any) => <p className="line-clamp-3">{desc}</p>,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Đạo diễn",
      dataIndex: "director_id",
      key: "director_id",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Diễn viên",
      dataIndex: "actors",
      key: "actors",
      render: ({ actors }) =>
        actors.map((item) => <span className="m-1">{item.name}</span>),
    },
    {
      title: "Hành động",
      key: "action",
      render: ({ key: id }: { key: number | string }) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/movies/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm"
              onConfirm={() => {
                remove(id)
                  .unwrap()
                  .then(() => {
                    messageApi.open({
                      type: "success",
                      content: "Xóa phim thành công",
                    });
                  });
              }}
              okText="Có"
              cancelText="Không"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  const dataSource = movies?.data?.map((item) => {
    return {
      key: item.id,
      name: item.name,
      title: item.title,
      genres: item,
      image: item.image,
      trailer: item.trailer,
      description: item.description,
      release_date: item.release_date,
      duration: item.duration,
      status: item.status,
      actors: item,
      director_id: item.director?.name,
    };
  });

  return (
    <>
      {contextHolder}
      {isLoadingMovies ? (
        <IsLoading />
      ) : (
        <div>
          
         <div className="md:flex justify-between items-center">
           <Button className="m-2">
            <Link to={"/admin/movies/create"}>Thêm Phim Mới</Link>
          </Button>
              {/* <GarbageComponent /> */}
            </div>
          <h1 className="text-xl uppercase font-bold mb-4 bg-white p-4 rounded-md shadow-md">Danh sách phim </h1>
          <Table dataSource={dataSource} columns={columns} className="bg-white p-4 rounded-md shadow-md"/>;

        </div>
      )}
    </>
  );
};

export default MovieTable;

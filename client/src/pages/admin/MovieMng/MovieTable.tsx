import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom'
import { CiPickerEmpty, CiTrash } from "react-icons/ci";
import { useGetAllMoviesQuery, useRemoveMovieMutation } from '../../../redux/api/movieApi';
import IsLoading from '../../../utils/IsLoading';

const MovieTable = () => {
  const {data:movies, isLoading:isLoadingMovies} = useGetAllMoviesQuery()
  const [messageApi , contextHolder] = message.useMessage()
  const [remove] = useRemoveMovieMutation()
  
  
  
  const columns = [
  
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Genres',
      dataIndex: 'genres',
      key: 'genres',
      render:({genres})=> genres.map(item=><span className='m-1'>{item.name}</span>)
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image:any) => <img src={image} alt="Movie Image" style={{ width: '50px' }} />,
    },
    {
      title: 'Trailer',
      dataIndex: 'trailer',
      key: 'trailer',
  
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Release Date',
      dataIndex: 'release_date',
      key: 'release_date',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Director',
      dataIndex: 'director_id',
      key: 'director_id',
    },
    {
      title: 'Actors',
      dataIndex: 'actors',
      key: 'actors',
      render:({actors})=> actors.map(item=><span className='m-1'>{item.name}</span>)
    },
    {
      title: "Action",
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
                remove(id).unwrap().then(()=>{
                  messageApi.open({
                    type:"success",
                    content:"Xóa phim thành công"
                  })
                })
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
  
  const dataSource = movies?.data?.map((item)=>{
    return {
      key:item.id,
      name:item.name,
      title: item.title,
      genres:item,
      image: item.image,
      trailer: item.trailer,
      description: item.description,
      release_date:item.release_date,
      duration: item.duration,
      actors:item,
      director_id: item.director?.name,
    }
  })
  
  return (
    <>
    {contextHolder}
    {
    isLoadingMovies ? <IsLoading/>:
    <div>
      <Button className='m-2'>
        <Link to={"/admin/movies/create"}>Thêm Phim</Link>
      </Button>
      <h1 className='text-xl uppercase font-bold mb-4' >Danh sách phim </h1>
      <Table dataSource={dataSource} columns={columns} />;
    </div>}
    </>
  );
};

export default MovieTable;
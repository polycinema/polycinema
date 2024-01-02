import React, { JSXElementConstructor, useEffect, useState } from "react";
import Statistic from "../../../components/Statistic";
import { Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetTop10MovieQuery } from "../../../redux/api/statisticApi";
import { ITop10Movie } from "../../../interfaces/top10movie";
import IsLoading from "../../../utils/IsLoading";
import { formatCurrency } from "../../../utils/formatVND";
import { FaEye } from "react-icons/fa";
import YouTube from "react-youtube";


const Dashboard = () => {
  const {data,isLoading,error}:any = useGetTop10MovieQuery();
  const [top10movie,setTop10Movie] = useState([]);
  const [isModalOpenTrailer,setIsModalOpenTrailer] = useState(false);
  const [movie,setMovie] = useState<ITop10Movie>()
  // console.log("isloading: ",isloading);
  // console.log("error: ",error);
  // console.log('top10movie: ',top10movie)
  useEffect(()=>{
    if(data){
      setTop10Movie(data.data)
    }
  },[data])
  if(isLoading){
    return (
      <>
        <IsLoading />
      </>
    );
  }
  if(error){
    console.error(error);
  }
  const openModalTrailer = (movie:ITop10Movie) =>{
    setIsModalOpenTrailer(true)
    setMovie(movie)
  }
  const handleCancel = () =>{
    setIsModalOpenTrailer(false)
  }
  const dataSource = top10movie.map((items:ITop10Movie)=>{
    return {
      name: items.name,
      image: items.image,
      trailer: items.trailer,
      description: items.description,
      total_revenue: items.total_revenue,
    }
  })
  const columns: ColumnsType<ColumnTypeTopMovie> = [
    {
      title: 'Tên Phim',
      dataIndex: 'name',
      key: 'name',
      align: "center",
      fixed: "left",
      width: 150,
      render: (name)=>(
        <span className="line-clamp-2">{name}</span>
      )
    },
    {
      title: 'Poster',
      dataIndex: 'image',
      key: 'image',
      align: "center",
      width: 100,
      fixed: "left",
      render: (image)=> (
        <img src={image} alt="" className=""/>
      )
    },
    {
      title: 'Trailer ',
      dataIndex: 'trailer',
      key: 'trailer',
      align: "center",
      width: 100,
      render: (trailer,movie:ITop10Movie) => (
        <button onClick={()=> openModalTrailer(movie)}>
          <FaEye className="text-blue-500"/>
        </button>
      )
    },
    {
      title: 'Mô tả ',
      dataIndex: 'description',
      key: 'description',
      align: "center",
      width: 250,
      render: (desc)=>(
        <p className="line-clamp-3">{desc}</p>
      )
    },
    {
      title: 'Doanh thu',
      dataIndex: 'total_revenue',
      key: 'total_revenue',
      align: "center",
      width: 100,
      render: (total_price) => (
        <span>{formatCurrency(total_price)}</span>
      )
    },
  ];
  return (
    <>
      <h1 className="text-2xl p-2">Dashboard</h1>
      <div className="flex">
        <div className="flex-none w-[700px]">
          <Statistic />
        </div>
        <div className="space-y-6">
          <span className="text-2xl">Top 10 phim có doanh thu cao nhất</span>
          <Table dataSource={dataSource} columns={columns} />;
        </div>
      </div>
      <Modal
        title={`Trailer: ${movie?.name}`}
        open={isModalOpenTrailer}
        width={700}
        onCancel={handleCancel}
      >
        <YouTube videoId={movie?.trailer} />
      </Modal>
    </>
  );
};

export default Dashboard;
interface ColumnTypeTopMovie {
  title: string,
  dataIndex: string,
  key: string,
  align: string,
}

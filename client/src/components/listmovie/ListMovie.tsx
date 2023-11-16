import "./ListMovie.css";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { Button, Modal, Tabs, TabsProps } from "antd";
import { useState } from "react";
import YouTube from "react-youtube";
import ButtonCustom from "../Button";
import { useGetAllMoviesQuery } from "../../redux/api/movieApi";
import IsLoading from "../../utils/IsLoading";
const ListMovie = () => {
  const [isModalOpenTrailer, setIsModalOpenTrailer] = useState(false);
  const [isModalOpenChonGio, setIsModalOpenChonGio] = useState(false);
  const [isModalOpenDatGhe, setIsModalOpenDatGhe] = useState(false);;
  const { data: Movies, isLoading, error } = useGetAllMoviesQuery();
//   console.log("data movie: ", Movies);
  if (error) {
    console.error("error get movies: ", error);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  const showModalTrailer = () => {
    setIsModalOpenTrailer(true);
  };
  const handleCancel = () => {
    setIsModalOpenTrailer(false);
  };
  const showModalChonGio = () => {
    setIsModalOpenChonGio(true);
  };
  const handleCancelChonGio = () => {
    setIsModalOpenChonGio(false);
  };
  const showModalDatGhe = () => {
    setIsModalOpenDatGhe(true);
  };
  const handleCancelDatGhe = () => {
    setIsModalOpenDatGhe(false);
  };
  const itemsTag: TabsProps["items"] = [
    {
      key: "1",
      label: "14/11",
    },
    {
      key: "2",
      label: "15/11",
    },
    {
      key: "3",
      label: "16/11",
    },
  ];
  return (
    <div className="listmovie__container ">
      <div className="tab-listmovie ">
        <ul className="list-tab">
          <li className="item-tab">
            <a href="#tab_1" data-toggle="tab" className="">
              Phim sắp chiếu
            </a>
          </li>

          <li className="item-tab">
            <a href="#tab_2" data-toggle="tab" className="">
              Phim đang chiếu
            </a>
          </li>
          <li className="item-tab">
            <a href="#tab_3" data-toggle="tab" className="">
              Suất chiếu đặc biệt
            </a>
          </li>
        </ul>
      </div>
      <div className="product__movies">
        {Movies?.data.map((items: any) => {
          return (
            <div className="product__movies-item" key={items.id}>
              <Modal
                title={`Trailer: ${items.title}`}
                open={isModalOpenTrailer}
                width={700}
                onCancel={handleCancel}
              >
                <YouTube videoId="Wkdv3tUfs2k?si=jleY-5DkdxR0396Q" />
              </Modal>
              <div className="movie-img">
                <div className="bg-movie"></div>

                <img className="movie-img-item" src={`${items.image}`} alt="" />

                <div className="movie-play">
                  <Button onClick={showModalTrailer}>
                    <AiFillPlayCircle />
                  </Button>
                </div>
                <div className="movie-icon-tag">
                  <img
                    src="https://www.betacinemas.vn/Assets/Common/icons/films/c-18.png"
                    alt=""
                  />
                </div>
                <div
                  className="movie-icon-sale"
                  style={{
                    backgroundImage:
                      "url(https://www.betacinemas.vn/assets/frontend/layout/img/hot.png)",
                  }}
                ></div>
              </div>

              <div className="movie-item-description">
                <h4 className="movie-name">
                  <Link to={`/poly-moviesDetail/${items.id}`}>
                    {items.name}
                  </Link>
                </h4>
                <div className="movie-des">
                  <p className="movie-des-1">Thể loại:</p>
                  {items.genres.map((itemGenres: any) => {
                    return <p className="movie-des-2">{itemGenres.name}</p>;
                  })}
                </div>
                <div className="movie-des">
                  <p className="movie-des-1">Thời lượng:</p>
                  <p className="movie-des-2">{items.duration} phút</p>
                </div>
                <Modal
              title="Lịch chiếu : Qủy Linh Nhi"
              open={isModalOpenChonGio}
              width={1000}
              onCancel={handleCancelChonGio}
            >
              <h4 className="text-center text-3xl my-2">Rạp PolyCinema</h4>
              <Tabs size="large" items={itemsTag} />
              <div className="mt-4">
                <h5 className="text-[18px] font-bold">Chọn thời gian </h5>

                <div className="flex space-x-5 mt-4">
                  <div className="flex flex-col">
                    <Modal
                      title="BẠN ĐANG ĐẶT VÉ XEM PHIM"
                      open={isModalOpenDatGhe}
                      width={700}
                      onCancel={handleCancelDatGhe}
                    >
                      <h4 className="text-center text-3xl text-[#03599d] pt-4">
                        Quỷ Linh Nhi
                      </h4>

                      <table className="w-full my-8 ">
                        <tr className="text-center border-b  ">
                          <td className="text-xl p-4">Ngày chiếu</td>
                          <td className="text-xl p-4">Giờ Chiếu</td>
                        </tr>
                        <tr className="text-center">
                          <td className="p-4 text-xl">14/11/2023</td>
                          <td className="p-4 text-xl">12:50</td>
                        </tr>
                      </table>
                      <div className="text-center">
                        <ButtonCustom width="20%">
                          <Link to={""}>Đồng Ý</Link>
                        </ButtonCustom>
                      </div>
                    </Modal>
                    <button
                      onClick={showModalDatGhe}
                      className="bg-[#e5e5e5] px-[17px] py-[5px] text[14px] "
                    >
                      12:00
                    </button>
                    <p>170 ghế trống</p>
                  </div>
                </div>
              </div>
            </Modal>
            <ButtonCustom onClick={showModalChonGio} width="100%">
              Mua Vé
            </ButtonCustom>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMovie;

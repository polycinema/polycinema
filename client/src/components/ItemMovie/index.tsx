import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { Button, Empty, Modal, Tabs } from "antd";
import { useState } from "react";
import YouTube from "react-youtube";
import ButtonCustom from "../Button";
import IsLoading from "../../utils/IsLoading";
import dayjs from "dayjs";
import { useGetShowTimeByMovieQuery } from "../../redux/api/checkoutApi";
import { convertSlug } from "../../utils/convertSlug";
type Props = {
  movie: any;
};
const ItemMovie = ({ movie }: Props) => {
  const [isModalOpenTrailer, setIsModalOpenTrailer] = useState(false);
  const [isModalOpenChonGio, setIsModalOpenChonGio] = useState(false);
  const [isModalOpenDatGhe, setIsModalOpenDatGhe] = useState(false);
  const [movieId, setMovieId] = useState<number>();
  const [showTimeById, setShowTimeById] = useState();
  const { data: showtimesAll, isLoading: isLoadingShowTime } =
    useGetShowTimeByMovieQuery(movieId || "");
  const showModalTrailer = () => {
    setIsModalOpenTrailer(true);
  };
  const handleCancel = () => {
    setIsModalOpenTrailer(false);
  };
  const showModalChonGio = (id) => {
    setIsModalOpenChonGio(true);
    setMovieId(id);
  };
  const handleCancelChonGio = () => {
    setIsModalOpenChonGio(false);
  };
  const showModalDatGhe = (value) => {
    setShowTimeById(value);
    setIsModalOpenDatGhe(true);
  };
  const handleCancelDatGhe = () => {
    setIsModalOpenDatGhe(false);
  };

  return (
    <div className="product__movies-item" key={movie?.id}>
      <Modal
        title={`Trailer: ${movie?.name}`}
        open={isModalOpenTrailer}
        width={700}
        onCancel={handleCancel}
      >
        <YouTube videoId={movie?.trailer} />
      </Modal>
      <div className="movie-img">
        <div className="bg-movie"></div>
        <img className="movie-img-item" src={`${movie?.image}`} alt="" />
        <div className="movie-play">
          <Button onClick={showModalTrailer}>
            <AiFillPlayCircle />
          </Button>
        </div>
        <div className="movie-icon-tag bg-[#03599D] rounded-sm p-[2px]">
          <div className="text-center text-[10px] font-bold text-white rounded-sm border border-white">
            P{movie?.id}
          </div>
        </div>
        {movie?.status === "upcoming" ? (
          <div
            className="movie-icon-sale"
            style={{
              backgroundImage:
                "url(https://www.betacinemas.vn/assets/frontend/layout/img/hot.png)",
            }}
          ></div>
        ) : (
          <div></div>
        )}
      </div>

      <div className="movie-item-description">
        <h4 className="movie-name my-4">
          <Link
            to={`movies/${convertSlug(movie?.name)}-${movie?.id}.html/detail`}
          >
            {movie?.name}
          </Link>
        </h4>
        <div className="movie-des h-[30px]">
          <p className="movie-des-1">Thể loại:</p>
          <p className="movie-des-2">
            {movie?.genres?.slice(0, 4)?.map((itemGenres: any) => {
              return <span key={itemGenres?.id}>{itemGenres?.name},</span>;
            })}
            ...
          </p>
        </div>
        <div className="movie-des h-[30px]">
          <p className="movie-des-1">Ngày chiếu:</p>
          <p className="movie-des-2">
            {dayjs(movie?.release_date).format("DD/MM")}
          </p>
        </div>
        <div className="movie-des h-[30px]">
          <p className="movie-des-1">Thời lượng:</p>
          <p className="movie-des-2">{movie?.duration} phút</p>
        </div>
        <Modal
          title={`Lịch chiếu `}
          open={isModalOpenChonGio}
          width={1000}
          onCancel={handleCancelChonGio}
        >
          {isLoadingShowTime ? (
            <IsLoading />
          ) : (
            <div>
              <h4 className="text-center text-3xl my-2">Rạp PolyCinema</h4>
              {showtimesAll?.data?.length === 0 ? (
                <Empty />
              ) : (
                <Tabs
                  size="large"
                  items={showtimesAll?.data?.map((item, length) => {
                    return {
                      key: length,
                      label: dayjs(item.date).format("DD/MM"),
                      children: (
                        <div className="mt-4">
                          <h5 className="text-[18px] font-bold">
                            Chọn thời gian{" "}
                          </h5>
                          <div className="flex space-x-5 mt-4">
                            <div className="flex flex-col">
                              <Modal
                                title="BẠN ĐANG ĐẶT VÉ XEM PHIM"
                                open={isModalOpenDatGhe}
                                width={700}
                                onCancel={handleCancelDatGhe}
                              >
                                {isLoadingShowTime ? (
                                  <IsLoading />
                                ) : (
                                  <>
                                    <h4 className="text-center text-3xl text-[#03599d] pt-4">
                                      {movie?.name}
                                    </h4>
                                    <table className="w-full my-8 ">
                                      <tr className="text-center border-b  ">
                                        <td className="text-xl p-4">
                                          Ngày chiếu
                                        </td>
                                        <td className="text-xl p-4">
                                          Giờ Chiếu
                                        </td>
                                      </tr>
                                      <tr className="text-center">
                                        <td className="p-4 text-xl">
                                          {dayjs(
                                            showTimeById?.show_date
                                          ).format("DD/MM")}
                                        </td>
                                        <td className="p-4 text-xl">
                                          {showTimeById?.start_time}
                                        </td>
                                      </tr>
                                    </table>
                                    <div className="text-center">
                                      <ButtonCustom width="20%">
                                        <Link
                                          to={`/poly-checkout/${showTimeById?.id}`}
                                        >
                                          Đồng Ý
                                        </Link>
                                      </ButtonCustom>
                                    </div>
                                  </>
                                )}
                              </Modal>
                              <div className="flex gap-4">
                                {item.showtimes?.map((item, index) => (
                                  <div key={index}>
                                    <button
                                      onClick={() =>
                                        showModalDatGhe(item?.showtime)
                                      }
                                      className="bg-[#e5e5e5] px-[17px] py-[5px] text[14px] "
                                    >
                                      {item?.showtime?.start_time}
                                    </button>
                                    <p>{item?.available_seats} ghế trống</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    };
                  })}
                />
              )}
            </div>
          )}
        </Modal>
        {movie?.status === "upcoming" || movie?.status === "unscreen" ? (
          <div></div>
        ) : (
          <ButtonCustom
            onClick={() => {
              showModalChonGio(movie?.id);
            }}
            width="100%"
          >
            Mua Vé
          </ButtonCustom>
        )}
      </div>
    </div>
  );
};

export default ItemMovie;

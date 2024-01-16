import { useParams } from "react-router";
import "./MovieDetail.css";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import { useState, useEffect } from "react";
import IsLoading from "../../utils/IsLoading";
import YouTube from "react-youtube";
import { FacebookProvider, Comments } from "react-facebook";
import { useGetShowtimeByIDMovieQuery } from "../../redux/api/showTimeApi";
import dayjs from "dayjs";
import { Modal } from "antd";
import ButtonCustom from "../../components/Button";
import { Link } from "react-router-dom";

const MovieDetail = () => {
  const { slug } = useParams();
  const slugParams = slug?.split(".html") ?? [];
  const temp = slugParams[0]?.split("-") as string;
  const id = temp[temp.length - 1];
  const { data: movieById, isLoading, error } = useGetMovieByIdQuery(id);
  const {
    data: showtimeByMovieId,
    isLoading: loadingShowtimeBMVID,
    error: errShowtimeBMVID,
  } = useGetShowtimeByIDMovieQuery(id);
  const [movie, setMovie] = useState<any>({});
  const [shotimeBMVID, setShowtimeBMVID] = useState<Datum[]>();
  const [shotimeChange, setShowtimeChange] = useState<Datum>();
  const [shotimeDate, setShowtimeDate] = useState<string>();
  const [showtimeIdPrimary, SetShowtimeIdPrimary] = useState<Datum>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateChange,setDateChange] = useState<Showtime>()
  useEffect(() => {
    if (showtimeIdPrimary) {
      setShowtimeDate(showtimeIdPrimary.date);
    }
  }, [showtimeIdPrimary]);
  useEffect(() => {
    if (shotimeBMVID?.length > 0) {
      SetShowtimeIdPrimary(shotimeBMVID[0]);
    }
  }, [shotimeBMVID]);
  useEffect(() => {
    if (movieById) {
      setMovie(movieById.data);
    }
    if (showtimeByMovieId) {
      setShowtimeBMVID(showtimeByMovieId.data);
    }
  }, [movieById, showtimeByMovieId]);
  useEffect(() => {
    if (shotimeDate) {
      const showtimeChange = shotimeBMVID?.filter(
        (items: Datum) => items.date === shotimeDate
      );
      setShowtimeChange(showtimeChange[0]);
    }
  }, [shotimeDate, shotimeBMVID]);
  if (error) {
    console.error("error get by id movies: ", error);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const showModal = (dateMovie:Showtime) => {
    setIsModalOpen(true);
    setDateChange(dateMovie)
  };
  return (
    <>
      <div className="container">
        <h3 className="title">
          Trang chủ <span className="nameMovie">{}</span>
        </h3>
        <div className="title1">
          <div className="title1-img">
            <img className="img" src={movie?.image} alt="" />
          </div>
          <div className="title1-text">
            <h1>{movie?.title}</h1>
            <p>{movie?.description}</p>

            <div className="text1">
              <div className="text-director">
                <span className="director"> ĐẠO DIỄN : </span>
              </div>
              <div className="text1-1">{movie?.director?.name}</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> DIỄN VIÊN : </span>
              </div>
              {movie?.actors?.map((itemsActors: any, index: number) => {
                return (
                  <div className="text1-1 mr-2" key={index}>
                    {itemsActors.name}
                    {index < movie.actors?.length - 1 ? "," : ""}
                  </div>
                );
              })}
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> THỂ LOẠI : </span>
              </div>
              {movie.genres?.map((itemsGenres: any, index: number) => {
                return (
                  <div className="text1-1 mr-2" key={index}>
                    {itemsGenres.name}
                    {index < movie.genres.length - 1 ? "," : ""}
                  </div>
                );
              })}
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> THỜI LƯỢNG : </span>
              </div>
              <div className="text1-1">{movie.duration} phút</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> NGÀY CHIẾU : </span>
              </div>
              <div className="text1-1">20/10/2023</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 md:mt-6 px-6 md:px-0">
          <div className="border-b-2 border-gray-400 space-x-6 ">
            {shotimeBMVID?.map((items: Datum,index:number) => (
              <button
                className="pb-2"
                onClick={() => setShowtimeDate(items.date)}
                key={index}
              >
                <span
                  className={
                    items.date === shotimeDate
                      ? "text-[#03599d] border-b border-b-[#03599d] pb-2 mr-3 text-2xl"
                      : " pb-2 mr-3 text-xl"
                  }
                >
                  {dayjs(items.date).format("DD-MM-YYYY")}
                </span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            <p>2D PHỤ ĐỀ</p>
            <div className="space-x-6">
              {shotimeChange?.showtimes?.map((items: Showtime2,index:number) => (
                <button
                  className="space-y-2"
                  onClick={() => showModal(items.showtime)}
                  key={index}
                >
                  <span className="bg-gray-300 px-6 py-1 rounded-sm">
                    {items.showtime.start_time}
                  </span>
                  <p className="text-xs">{items.available_seats} ghế trống</p>
                </button>
              )) ?? 'Không có giờ chiếu'}
            </div>
          </div>
        </div>
      </div>

      <div className="title2">
        <h1>TRAILER</h1>
        <div className="title2-video">
          <YouTube videoId={movie.trailer} />
        </div>
      </div>
      <div className="title3">
        <div className="title3_facebook">
          <FacebookProvider appId="287337234293370">
            <Comments href={`quanhongdo.ga/${slug}`} numPosts={20} />
          </FacebookProvider>
        </div>
      </div>
      <Modal
        title={`Bạn đang đặt vé xem phim`}
        open={isModalOpen}
        width={700}
        onCancel={handleCancelModal}
      >
        <>
          <h4 className="text-center text-3xl text-[#03599d] pt-4">
            {movie.name}
          </h4>
          <table className="w-full my-8 ">
            <tr className="text-center border-b  ">
              <td className="text-xl p-4">Ngày chiếu</td>
              <td className="text-xl p-4">Giờ Chiếu</td>
            </tr>
            <tr className="text-center">
              <td className="p-4 text-xl">
                {dayjs(dateChange?.show_date).format("DD/MM")}
              </td>
              <td className="p-4 text-xl">
                {dateChange?.start_time}
              </td>
            </tr>
          </table>
          <div className="text-center">
            <ButtonCustom width="20%">
              <Link to={`/poly-checkout/${dateChange?.id}`}>Đồng Ý</Link>
            </ButtonCustom>
          </div>
        </>
      </Modal>
    </>
  );
};

export default MovieDetail;
interface Datum {
  date: string;
  showtimes: Showtime2[];
}
interface Showtime2 {
  showtime: Showtime;
  available_seats: number;
}
interface Showtime {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}

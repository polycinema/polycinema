import { Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { useGetShowTimesMovieQuery } from "../../redux/api/showTimeApi";
import { convertSlug } from "../../utils/convertSlug";
import IsLoading from "../../utils/IsLoading";
import ButtonCustom from "../../components/Button";
import dayjs from "dayjs";
import {
  deleteCoupon,
  deleteValueBooking,
  deleteValueProduct,
} from "../../redux/slices/valueCheckoutSlice";
import { useAppDispatch } from "../../store/hook";
import { useGetAllMoviesQuery } from "../../redux/api/movieApi";

const MoviePage = () => {
  const [isModalOpenTrailer, setIsModalOpenTrailer] = useState(false);
  const [isModalOpenStartTime, setIsModalOpenStartTime] = useState(false);
  const { data, isLoading, error }: any = useGetShowTimesMovieQuery();
  const { data: movieUpscreing } = useGetAllMoviesQuery();
  const [showtime, setShowtime] = useState([]);
  const [indexDate, setIndexDate] = useState(0);
  const [showtimesByChange, setShowtimeByChange] = useState<MovieTime[]>();
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [selectedMovieModalTime, setSelectedMovieModalTime] =
    useState<ModalTime>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(deleteValueProduct());
    dispatch(deleteValueBooking());
    dispatch(deleteCoupon());
  }, []);
  useEffect(() => {
    if (showtimesByChange) {
      setMovies(showtimesByChange.movie);
    }
  }, [showtimesByChange]);
  useEffect(() => {
    if (data) {
      setShowtime(data?.data);
    }
    if (showtime.length) {
      const index = showtime.filter((items, index) => index === indexDate);
      setShowtimeByChange(index[0]);
    }
    if (!showtime.length) {
      <Empty />;
    }
  }, [data, showtime, indexDate]);
  if (error) {
    console.error(error);
  }
  if (isLoading) {
    return (
      <>
        <IsLoading />
      </>
    );
  }
  if (!showtime.length) {
    return (
      <div className="h-[50vh]">
        <Empty />
      </div>
    );
  }
  const showModalTrailer = (movies: Movie) => {
    setSelectedMovie(movies);
    setIsModalOpenTrailer(true);
  };
  const handleCancel = () => {
    setIsModalOpenTrailer(false);
  };
  const handleCancelModalStartTime = () => {
    setIsModalOpenStartTime(false);
  };
  const showModalStartTime = (movies: ModalTime) => {
    setSelectedMovieModalTime(movies);
    setIsModalOpenStartTime(true);
  };
  const nextDetail = (movie: Movie) => {
    if (movie) {
      const name = movie?.name;
      const id = movie?.id;
      return navigate(`/movies/${convertSlug(name)}-${id}.html/detail`);
    }
  };
  return (
    <div className="moviepage__container">
      <div className="moviepage-date max-w-[1150px] mx-auto  border-b border-gray-400 p-4">
        <ul className="flex md:space-x-7 py-4 flex-wrap">
          {showtime.map((items: MovieTime, index) => {
            return (
              <li
                className={`px-4 py-2 text-center ${
                  indexDate === index
                    ? "text-[#03599d] border-b-4 border-b-[#03599d] text-2xl"
                    : "text-xl"
                } `}
                onClick={() => setIndexDate(index)}
                key={index}
              >
                <Link to={""}>
                  <span className="mr-3">
                    {dayjs(items.show_date).format("DD-MM-YYYY")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {movies?.map((movie: Movie, index: number) => {
        return (
          <div className="md:max-w-[1150px] max-w-xs mx-auto my-10" key={index}>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div
                className="relative md:w-[310px] w-[130px] group"
                onClick={() => showModalTrailer(movie)}
              >
                <img src={movie?.image} alt="" className="rounded-xl" />
                <button className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 hidden group-hover:block transition-all rounded-xl">
                  <i className="fas fa-play-circle text-white text-4xl"></i>
                </button>
              </div>
              <div className="">
                {/* movies/${convertSlug(movie?.movie?.name)}-${movie?.movie?.id}.html/detail */}
                <div
                  className="cursor-pointer"
                  onClick={() => nextDetail(movie)}
                >
                  <span className="md:text-4xl text-2xl text-[#03599d]">
                    {movie?.name}
                  </span>
                </div>
                <div className="mt-2">
                  <i className="fas fa-tags text-[#337ab7] mr-2"></i>
                  {movie?.genres?.map((items: Genre, index: number) => {
                    return (
                      <span key={index} className="mr-2">
                        {items?.name}
                        {index < movie?.genres.length - 1 ? "," : ""}
                      </span>
                    );
                  })}
                  <span className="">
                    <i className="far fa-clock text-[#337ab7] mr-1"></i>
                    {movie?.duration}
                  </span>
                </div>

                <div className="space-y-2 mt-3">
                  <p>2D PHỤ ĐỀ</p>
                  <div className="md:flex gap-x-3 grid grid-cols-2">
                    {movie?.showtimes?.map((items) => (
                      <div key={items.id}>
                        <button
                          className="bg-gray-300 px-2 py-1 "
                          onClick={() =>
                            showModalStartTime({
                              start_time: items.start_time,
                              show_date: items.show_date,
                              showtime_id: items.id,
                              name_movie: movie.name,
                            })
                          }
                        >
                          {items?.start_time}
                        </button>
                        <p className="text-xs">
                          {items?.seats[0]?.available_seat} ghế trống
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
        );
      })}

      <div className="bg-black px-4">
        <div className="max-w-[1150px] mx-auto py-10 overflow-hidden">
          <h4 className="mx-auto text-white md:text-4xl font-bold border-b-4 border-b-[#03599d] w-fit p-4 ">
            Phim Sắp Chiếu
          </h4>
          <div className="flex gap-1 md:translate-x-[400px] py-20">
            {movieUpscreing?.data
              ?.filter((item) => item.status == "upcoming")
              ?.map((item) => (
                <div>
                  <button onClick={() => nextDetail(item)}>
                    <img className="w-48" src={item?.image} alt="" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        title={`Bạn đang đặt vé xem phim`}
        open={isModalOpenStartTime}
        width={700}
        onCancel={handleCancelModalStartTime}
      >
        <>
          <h4 className="text-center text-3xl text-[#03599d] pt-4">
            {selectedMovieModalTime?.name_movie}
          </h4>
          <table className="w-full my-8 ">
            <tr className="text-center border-b  ">
              <td className="text-xl p-4">Ngày chiếu</td>
              <td className="text-xl p-4">Giờ Chiếu</td>
            </tr>
            <tr className="text-center">
              <td className="p-4 text-xl">
                {dayjs(selectedMovieModalTime?.show_date).format("DD/MM")}
              </td>
              <td className="p-4 text-xl">
                {selectedMovieModalTime?.start_time}
              </td>
            </tr>
          </table>
          <div className="text-center">
            <ButtonCustom width="20%">
              <Link
                to={`/poly-checkout/${selectedMovieModalTime?.showtime_id}`}
              >
                Đồng Ý
              </Link>
            </ButtonCustom>
          </div>
        </>
      </Modal>
      <Modal
        title={`Trailer: ${selectedMovie?.name}`}
        open={isModalOpenTrailer}
        width={700}
        onCancel={handleCancel}
      >
        <YouTube videoId={selectedMovie?.trailer} />
      </Modal>
    </div>
  );
};

export default MoviePage;
export interface RootMovieTime {
  data: MovieTime[];
}

export interface MovieTime {
  show_date: string;
  movie: Movie[];
}

export interface Movie {
  id: number;
  name: string;
  title: string;
  image: string;
  trailer: string;
  description: string;
  release_date: string;
  duration: number;
  director_id: number;
  status: string;
  level: string;
  deleted_at: any;
  created_at: any;
  updated_at: any;
  genres: Genre[];
  showtimes: Showtime[];
}

export interface Genre {
  name: string;
  pivot: Pivot;
}

export interface Pivot {
  movie_id: number;
  genre_id: number;
}

export interface Showtime {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  start_time: string;
  end_time: any;
  level: string;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  seats: Seat[];
}

export interface Seat {
  showtime_id: number;
  available_seat: number;
}

export interface ModalTime {
  showtime_id: number;
  start_time: string;
  show_date: string;
  name_movie: string;
}

import { Empty, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { useGetShowTimesMovieQuery } from "../../redux/api/showTimeApi";
import { convertSlug } from "../../utils/convertSlug";
import IsLoading from "../../utils/IsLoading";
import ButtonCustom from "../../components/Button";
import dayjs from "dayjs";

const MoviePage = () => {
  const [isModalOpenTrailer, setIsModalOpenTrailer] = useState(false);
  const [isModalOpenStartTime, setIsModalOpenStartTime] = useState(false);
  const { data, isLoading, error }: any = useGetShowTimesMovieQuery();
  const [showtimes, setShowtimes] = useState([]);
  const [indexDate, setIndexDate] = useState(0);
  const [showtime, setShowtime] = useState([0]);
  const [showtimesByChange, setShowtimeByChange] = useState<RootObject[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const [selectedMovieModalTime, setSelectedMovieModalTime] =
    useState<Showtime>();
  const navigate = useNavigate();
  // console.log("showtime by change: ", showtimesByChange[0]);
  // console.log("selectedMovieModalTime: ", selectedMovieModalTime);
  console.log("data: ", data);
  // console.log("index date: ", indexDate);

  useEffect(() => {
    
    if (data) {
      setShowtimes(data?.data);
    }
    if (showtimes.length) {
      const index = showtimes.filter((items, index) => index === indexDate);
      setShowtimeByChange(index);
    }
    if(!showtimes.length){
      <Empty/>
    }
  }, [data, showtimes, indexDate]);
  useEffect(() => {
    if (showtimesByChange.length) {
      const showtime = showtimesByChange.map((items: any) => items.showtime);
      setShowtime(showtime[0]);
      // console.log(showtime[0].push({color: '#03599d'}))
    }
  }, [showtimesByChange]);
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
  if(!showtimes.length){
    return <div className="h-[50vh]">
      <Empty/>
    </div>
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
  const showModalStartTime = (movies) => {
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
          {showtimes.map((items: RootObject, index) => {
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
                    {dayjs(items.show_date).format("DD/MM/YYYY")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className=""></div>
      {/* <ListMovie /> */}
      {showtime?.map((movie: Showtime, index: number) => {
        return (
          <div className="md:max-w-[1150px] max-w-xs mx-auto my-10" key={index}>
            <Modal
              title={`Trailer: ${selectedMovie?.name}`}
              open={isModalOpenTrailer}
              width={700}
              onCancel={handleCancel}
            >
              <YouTube videoId={selectedMovie?.trailer} />
            </Modal>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div
                className="relative md:w-[310px] w-[130px] group"
                onClick={() => showModalTrailer(movie?.movie)}
              >
                <img src={movie?.movie?.image} alt="" className="rounded-xl" />
                <button className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 hidden group-hover:block transition-all rounded-xl">
                  <i className="fas fa-play-circle text-white text-4xl"></i>
                </button>
              </div>
              <div className="">
                {/* movies/${convertSlug(movie?.movie?.name)}-${movie?.movie?.id}.html/detail */}
                <div
                  className="cursor-pointer"
                  onClick={() => nextDetail(movie?.movie)}
                >
                  <span className="md:text-4xl text-2xl text-[#03599d]">
                    {movie?.movie?.name}
                  </span>
                </div>
                <div className="mt-2">
                  <i className="fas fa-tags text-[#337ab7] mr-2"></i>
                  {movie?.genre?.map((items: any, index: any) => {
                    return (
                      <span key={index} className="mr-2">
                        {items?.name}
                        {index <= length - 1 ? "," : ""}
                      </span>
                    );
                  })}
                  <span className="">
                    <i className="far fa-clock text-[#337ab7] mr-1"></i>
                    {movie?.movie?.duration}
                  </span>
                </div>

                <div className="space-y-2 mt-3">
                  <p>2D PHỤ ĐỀ</p>
                  <button
                    className="bg-gray-300 px-2 py-1 "
                    onClick={() => showModalStartTime(movie)}
                  >
                    {movie.start_time}
                  </button>
                  <Modal
                    title={`Bạn đang đặt vé xem phim`}
                    open={isModalOpenStartTime}
                    width={700}
                    onCancel={handleCancelModalStartTime}
                  >
                    <>
                      <h4 className="text-center text-3xl text-[#03599d] pt-4">
                        {selectedMovieModalTime?.movie.name}
                      </h4>
                      <table className="w-full my-8 ">
                        <tr className="text-center border-b  ">
                          <td className="text-xl p-4">Ngày chiếu</td>
                          <td className="text-xl p-4">Giờ Chiếu</td>
                        </tr>
                        <tr className="text-center">
                          <td className="p-4 text-xl">
                            {dayjs(showtimesByChange[0]?.show_date).format(
                              "DD/MM"
                            )}
                          </td>
                          <td className="p-4 text-xl">
                            {selectedMovieModalTime?.start_time}
                          </td>
                        </tr>
                      </table>
                      <div className="text-center">
                        <ButtonCustom width="20%">
                          <Link to={`/poly-checkout/:id`}>Đồng Ý</Link>
                        </ButtonCustom>
                      </div>
                    </>
                  </Modal>
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
            <div>
              <Link to={""}>
                <img
                  className="w-48"
                  src="https://files.betacorp.vn/files/media/images/2023/10/09/cw-400x633-162007-091023-43.jpg"
                  alt=""
                />
              </Link>
            </div>

            <div>
              <Link to={""}>
                <img
                  className="w-40"
                  src="https://files.betacorp.vn/files/media/images/2023/10/03/th-nh-ph-ng-g-t-payoff-poster-kh-i-chi-u-13-10-2023-1-113244-031023-35.png"
                  alt=""
                />
              </Link>
            </div>

            <div>
              <Link to={""}>
                <img
                  className="w-40"
                  src="	https://files.betacorp.vn/files/media/images/2023/09/27/700x1000-vtm-1-153242-270923-76.png"
                  alt=""
                />
              </Link>
            </div>
            <div>
              <Link to={""}>
                <img
                  className="w-40"
                  src="https://files.betacorp.vn/files/media/images/2023/10/03/700x1000-5demkinhhoang-115804-031023-17.png"
                  alt=""
                />
              </Link>
            </div>
            <div>
              <Link to={""}>
                <img
                  className="w-48"
                  src="https://files.betacorp.vn/files/media/images/2023/10/10/384512522-860973838723843-7797595519513200784-n-copy-103620-101023-46.jpg"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
interface RootObject {
  show_date: string;
  showtime: Showtime[];
}
interface Showtime {
  movie: Movie;
  room: Room;
  genre: any;
  start_time: string;
  end_time: string;
  available_seat: number;
}
interface Room {
  id: number;
  room_name: string;
  capacity: number;
  deleted_at?: any;
  created_at?: any;
  updated_at?: any;
}
interface Movie {
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
  deleted_at?: any;
  created_at: string;
  updated_at: string;
}

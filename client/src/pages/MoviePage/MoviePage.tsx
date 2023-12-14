import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { useGetShowTimesMovieQuery } from "../../redux/api/showTimeApi";
import { convertSlug } from "../../utils/convertSlug";
import IsLoading from "../../utils/IsLoading";

const MoviePage = () => {
  const [isModalOpenTrailer, setIsModalOpenTrailer] = useState(false);
  const { data, isLoading, error }: any = useGetShowTimesMovieQuery();
  const [showtimes, setShowtimes] = useState([]);
  const [indexDate, setIndexDate] = useState(0);
  const [showtime, setShowtime] = useState([0]);
  const [showtimesByChange, setShowtimeByChange] = useState([]);

  console.log("list showtime: ", showtime);
  // console.log("list movies: ", movies);
  // console.log("showtimesByChange: ", showtimesByChange);
  // console.log("index date: ", indexDate);

  useEffect(() => {
    if (data) {
      setShowtimes(data?.data);
    }
    if (showtimes.length) {
      const index = showtimes.filter((items, index) => index === indexDate);
      setShowtimeByChange(index);
    }
  }, [data, showtimes, indexDate]);
  useEffect(() => {
    if (showtimesByChange.length) {
      const showtime = showtimesByChange.map((items: any) => items.showtime);
      setShowtime(showtime[0]);
    }
  }, [showtimesByChange]);
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

  return (
    <div className="moviepage__container">
      <div className="moviepage-date max-w-[1150px] mx-auto  border-b border-gray-400 p-4">
        <ul className="flex md:space-x-7 py-4 flex-wrap">
          {showtimes.map((items: RootObject, index) => {
            return (
              <li
                className="px-4 py-2 text-center  active:text-[#03599d] active:border-b-4 border-b-[#03599d]"
                onClick={() => setIndexDate(index)}
                key={index}
              >
                <Link to={""}>
                  <span className="text-2xl mr-3">{items.show_date}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className=""></div>
      {/* <ListMovie /> */}
      {showtime?.map((movie: Showtime, index) => {
        return (
          <div className="md:max-w-[1150px] max-w-xs mx-auto my-10" key={index}>
            <Modal
              title={`Trailer: ${movie?.movie?.name}`}
              open={isModalOpenTrailer}
              width={700}
              onCancel={handleCancel}
            >
              <YouTube videoId={movie?.movie?.trailer} />
            </Modal>
            <div className="grid grid-cols-2 md:grid-cols-3">
              <div
                className="relative md:w-[310px] w-[130px] group"
                onClick={showModalTrailer}
              >
                <img src={movie?.movie?.image} alt="" className="rounded-xl" />
                <button className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 hidden group-hover:block transition-all rounded-xl">
                  <i className="fas fa-play-circle text-white text-4xl"></i>
                </button>
              </div>
              <div className="">
                <Link
                  to={``}
                >
                  <div className="">
                    <span className="md:text-4xl text-2xl text-[#03599d]">
                      {movie?.movie?.name}
                    </span>
                  </div>
                  <div className="mt-2">
                  <i className="fas fa-tags text-[#337ab7] mr-2"></i>
                    {
                      movie?.genre?.map((items:any,index:any)=>{
                        return (
                          <span key={items.length} className="mr-2">{items?.name}{index <= length - 1 ? ',' : ''}</span>
                        )
                      })
                    }
                    <span className="">
                      <i className="far fa-clock text-[#337ab7] mr-1"></i>
                      {movie?.movie?.duration}
                    </span>
                  </div>
                </Link>
                <div className="space-y-2 mt-3">
                  <p>2D PHỤ ĐỀ</p>
                  <button className="bg-gray-300 px-2 py-1 ">
                    {movie.start_time}
                  </button>
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

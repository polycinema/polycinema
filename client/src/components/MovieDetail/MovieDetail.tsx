import { useParams } from "react-router";
import "./MovieDetail.css";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import { useState, useEffect } from "react";
import IsLoading from "../../utils/IsLoading";
const MovieDetail = () => {
  const { id } = useParams();
  const { data: movieById, isLoading, error } = useGetMovieByIdQuery(id);
  const [movie, setMovie] = useState<any>({});
  useEffect(() => {
    if (movieById) {
      setMovie(movieById.data);
    }
  }, [movieById]);
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
  console.log('data movie by id: ',movie)
  return (
    <>
      <div className="container">
        <h3 className="title">
          Trang chủ <span className="nameMovie">{}4</span>
        </h3>
        <div className="title1">
          <div className="title1-img">
            <img
              className="img"
              src="https://files.betacorp.vn/files/media%2fimages%2f2023%2f10%2f03%2fkumanthong-400x633-101044-031023-29.jpg"
              alt=""
            />
          </div>
          <div className="title1-text">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>

            <div className="text1">
              <div className="text-director">
                <span className="director"> ĐẠO DIỄN : </span>
              </div>
              <div className="text1-1">{movie.director_id}</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> DIỄN VIÊN : </span>
              </div>
              {movie.actors?.map((itemsActors: any) => {
                return <div className="text1-1" key={itemsActors.id}>{itemsActors.name}</div>;
              })}
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> THỂ LOẠI : </span>
              </div>
              {movie.genres?.map((itemsGenres: any) => {
                return <div className="text1-1" key={itemsGenres.id}>{itemsGenres.name }</div>;
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
      </div>

      <div className="title2">
        <h1>TRAILER</h1>
        <div className="title2-video">
          <iframe
            width="760"
            height="415"
            src={movie?.trailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;

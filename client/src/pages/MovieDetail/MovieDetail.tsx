import { useParams } from "react-router";
import "./MovieDetail.css";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import { useState, useEffect } from "react";
import IsLoading from "../../utils/IsLoading";
import YouTube from "react-youtube";
import { FacebookProvider, Comments } from "react-facebook";
import { getDirectorById } from "../../api/director";
const MovieDetail = () => {
  const { slug } = useParams();
  const slugParams = slug?.split(".html") ?? [];
  const temp = slugParams[0]?.split("-") as string;
  const id = temp[temp.length - 1];
  const { data: movieById, isLoading, error } = useGetMovieByIdQuery(id);
  const [movie, setMovie] = useState<any>({});
  const [nameDuration, setNameDuration] = useState();
  console.log("movieById: ", movieById);
  useEffect(() => {
    if (movieById) {
      setMovie(movieById.data);
    }
  }, [movieById]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getDirectorById(movieById?.data.director_id);
        console.log("data director name: ", data?.data.name);
        if (data) {
          setNameDuration(data?.data.name);
        }
      } catch (error) {
        console.error(error);
      }
    })();
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
  // console.log("data movie by id: ", movie);
  return (
    <>
      <div className="container">
        <h3 className="title">
          Trang chủ <span className="nameMovie">{}</span>
        </h3>
        <div className="title1">
          <div className="title1-img">
            <img className="img" src={movie.image} alt="" />
          </div>
          <div className="title1-text">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>

            <div className="text1">
              <div className="text-director">
                <span className="director"> ĐẠO DIỄN : </span>
              </div>
              <div className="text1-1">{nameDuration}</div>
            </div>

            <div className="text1">
              <div className="text-director">
                <span className="director"> DIỄN VIÊN : </span>
              </div>
              {movie.actors?.map((itemsActors: any, index: number) => {
                return (
                  <div className="text1-1 mr-2" key={itemsActors.id}>
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
                  <div className="text1-1 mr-2" key={itemsGenres.id}>
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
    </>
  );
};

export default MovieDetail;

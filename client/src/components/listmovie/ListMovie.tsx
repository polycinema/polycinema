import "./ListMovie.css";
import { Tabs, TabsProps } from "antd";
import { useGetAllMoviesQuery } from "../../redux/api/movieApi";
import IsLoading from "../../utils/IsLoading";
import ItemMovie from "../ItemMovie";
import { useState, useEffect } from "react";
const ListMovie = () => {
  const { data: Movies, isLoading, error } = useGetAllMoviesQuery();
  const [moviesFilter, setMoviesFilter] = useState([]);
  console.log('moviesFilter: ',moviesFilter)
  if (error) {
    console.error("error get movies: ", error);
  }

  // console.log(Movies.data.filter(item=> item.status === "upcoming" ));

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Phim sắp chiếu",
    },
    {
      key: "2",
      label: "Phim đang chiếu",
    },
    {
      key: "3",
      label: "Phim đã chiếu",
    },
  ];
  useEffect(() => {
    const result = Movies?.data?.filter((item:any) => item.status === "upcoming");
    console.log('result: ',result)
    if(result){
      setMoviesFilter(result);
    }
  }, [Movies]);

  const onChange = (value:any) => {
    if (value === "1") {
      const result = Movies?.data?.filter((item:any) => item.status === "upcoming");
      setMoviesFilter(result);
    } else if (value === "2") {
      const result = Movies?.data?.filter((item:any) => item.status === "screening");
      setMoviesFilter(result);
    } else {
      const result = Movies?.data?.filter((item:any) => item.status === "unscreen");
      setMoviesFilter(result);
    }
  };
  return (
    <div className="listmovie__container ">
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <div className="flex justify-center">
            <Tabs
              items={items}
              defaultActiveKey="1"
              onChange={isLoading === false ? onChange : onChange}
              size="large"
            />
          </div>
          <div className="product__movies">
            {moviesFilter?.map((item: any) => {
              return <ItemMovie movie={item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ListMovie;

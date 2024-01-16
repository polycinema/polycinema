import "./ListMovie.css";
import { Tabs, TabsProps } from "antd";
import { useGetAllMoviesQuery } from "../../redux/api/movieApi";
import IsLoading from "../../utils/IsLoading";
import ItemMovie from "../ItemMovie";
import { useState, useEffect } from "react";
const ListMovie = () => {
  const { data: Movies, isLoading, error } = useGetAllMoviesQuery();
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [keyActive, seKeyActive] = useState<string>("2");

  useEffect(() => {
    const result = Movies?.data?.filter(
      (item: any) => item.status === "screening"
    );
    if (result) {
      setMoviesFilter(result);
    }
  }, [Movies]);
  useEffect(() => {
    let result;
    switch (keyActive) {
      case "1":
        result = Movies?.data?.filter(
          (item: any) => item.status === "upcoming"
        );
        setMoviesFilter(result);
        break;
      case "2":
        result = Movies?.data?.filter(
          (item: any) => item.status === "screening"
        );
        setMoviesFilter(result);
        break;
      case "3":
        result = Movies?.data?.filter(
          (item: any) => item.status === "unscreen"
        );
        setMoviesFilter(result);
        break;

      default:
        break;
    }
  }, [keyActive]);
  if (error) {
    console.error("error get movies: ", error);
  }
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

  const onChange = (value: any) => {
    seKeyActive(value);
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
              defaultActiveKey="2"
              onChange={isLoading === false ? onChange : onChange}
              size="large"
            />
          </div>
          <div className="product__movies">
            {moviesFilter?.map((item: any, index: number) => {
              return <ItemMovie key={index} movie={item} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ListMovie;

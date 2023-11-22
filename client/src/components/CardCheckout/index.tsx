import React from "react";
import { FaTag } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa6";
import { FaGrip } from "react-icons/fa6";
import Button from "../Button";
import { useParams } from "react-router";
import { useGetSeatsByShowTimeQuery } from "../../redux/api/checkoutApi";
import dayjs from "dayjs";
import { useAppSelector } from "../../store/hook";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import { Link } from "react-router-dom";
const CardCheckout = () => {
  const { id } = useParams();
  const { data: Seats, isLoading } = useGetSeatsByShowTimeQuery(id || "");
  const { valueCheckout } = useAppSelector((state: any) => state.ValueCheckout);  
  const { data: movie } = useGetMovieByIdQuery(Seats?.data?.movie_id || "");

  return (
    <div>
      <div className="border-b-4 pb-8 border-dashed">
        <div className="flex justify-between px-4">
          <img className="w-[150px]" src={movie?.data?.image} alt="" />
          <h1 className="text-[#03599d] text-2xl font-bold pl-2">
            {movie?.data?.name}
          </h1>
        </div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaTag /> <span>Thể loại</span>
          </p>
          <p className="font-bold text-[14px]">
            {movie?.data?.genres?.map((item) => (
              <span>{item?.name},</span>
            ))}
          </p>
        </div>
        <div className="grid grid-cols-2 ml-12 items-center  gap-14 mt-6">
          <p className="flex items-center text-[14px]">
            <FaHistory /> <span>Thời lượng</span>
          </p>
          <p className="font-bold text-[14px]">90 phút</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaCalendarDays /> <span>Ngày chiếu</span>
          </p>
          <p className="font-bold text-[14px]">
            {dayjs(Seats?.data.show_date).format("DD-MM")}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaHistory /> <span>Giờ chiếu</span>
          </p>
          <p className="font-bold text-[14px]">{Seats?.data.start_time}</p>
        </div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaDesktop /> <span>Phòng chiếu</span>
          </p>
          <p className="font-bold text-[14px]">
            {Seats?.data?.room?.room_name}
          </p>
        </div>
        <div
          className="grid grid-cols-2 items-center ml-12  gap-14 mt-8 
                                "
        >
          <p className="flex items-center text-[14px] ">
            <FaDesktop /> <span>Ghế ngồi</span>
          </p>
          <p className="flex flex-wrap font-bold text-[14px]">
            {valueCheckout?.map((item) => (
              <span>{item.payload.seat.seat_name},</span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <Link to={`/poly-checkout/${id}`}>
          <Button width="100px">Quay lại</Button>
        </Link>
        <Link to={"product"}>
          <Button
            width="100px"
            onClick={() => {
              console.log("booking", {
                id: 1,
                showtime_id: Seats?.data.id,
                seats: valueCheckout,
                products: id,
                valueProduct: 2,
                total_price: "1000",
              });
            }}
          >
            Tiếp tục
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardCheckout;

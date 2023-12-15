import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import Button from "../Button";
import { useParams } from "react-router";
import { useGetSeatsByShowTimeQuery } from "../../redux/api/checkoutApi";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useGetMovieByIdQuery } from "../../redux/api/movieApi";
import { Link } from "react-router-dom";
import { setBooking } from "../../redux/slices/valueCheckoutSlice";
const CardCheckout = () => {
  const { id } = useParams();
  const { data: showtime, isLoading } = useGetSeatsByShowTimeQuery(id || "");
  const { products: stateProducts, valueSeatCheckout } = useAppSelector((state: any) => state.ValueCheckout);
  const { user } = useAppSelector((state: any) => state.Authorization);
  const { data: movie } = useGetMovieByIdQuery(showtime?.data?.movie_id || "");
  const [product, setProduct] = useState()
  const [seat, setSeat] = useState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const resultProduct = stateProducts?.map((item) => {
      return {
        id: item?.id,
        quantity: item?.quantity
      }
    })
    const resultSeat = valueSeatCheckout?.map((item) => {
      return {
        id: item.payload?.id
      }
    })
    setProduct(resultProduct);
    setSeat(resultSeat);

  }, [stateProducts, valueSeatCheckout])

  const booking = (value) => {
    dispatch(setBooking(value))
  }



  return (
    <div>
      <div className="border-b-4 pb-8 border-dashed">
        <div className="flex  justify-between px-4">
          <img className="w-[150px]" src={movie?.data?.image} alt="" />
          <h1 className="text-[#03599d] text-xl font-bold pl-2">
            {movie?.data?.name}
          </h1>
        </div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaTag /> <span>Thể loại</span>
          </p>
          <p className="font-bold text-[14px]">
            {movie?.data?.genres?.map((item) => (
              <span key={item?.id}>{item?.name},</span>
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
            {dayjs(showtime?.data.show_date).format("DD-MM")}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaHistory /> <span>Giờ chiếu</span>
          </p>
          <p className="font-bold text-[14px]">{showtime?.data.start_time}</p>
        </div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaDesktop /> <span>Phòng chiếu</span>
          </p>
          <p className="font-bold text-[14px]">
            {showtime?.data?.room?.room_name}
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
            {valueSeatCheckout?.map((item, index) => (
              <span key={index}>{item.payload.seat_name},</span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <Link to={"/poly-payment"}>
          <Button
            width="100px"
            onClick={() => {
              booking({
                products: product, movie_id: movie.data.id, user_id: user.id, showtime_id: showtime.data.id, total_price: stateProducts.reduce((sum: any, item: any) => {
                  return sum + item.price * item.quantity;
                }, 0) +
                  valueSeatCheckout.reduce(
                    (sum, seat) => sum + seat.payload.price,
                    0
                  ), seats: seat
              })
            }

            }
          >
            Tiếp tục
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CardCheckout;

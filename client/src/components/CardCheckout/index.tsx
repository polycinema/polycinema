import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import Button from "../Button";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Link } from "react-router-dom";
import { setBooking } from "../../redux/slices/valueCheckoutSlice";
type Props = {
  showtime: any,
  isLoading: boolean,
  user: any
}
const CardCheckout = ({ showtime, user }: Props) => {
  const { products: stateProducts } = useAppSelector((state: any) => state.ValueCheckout);
  const [product, setProduct] = useState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const resultProduct = stateProducts?.map((item) => {
      return {
        id: item?.id,
        quantity: item?.quantity
      }
    })
    setProduct(resultProduct);

  }, [stateProducts])

  const booking = (value) => {
    dispatch(setBooking(value))
  }



  return (
    <div>
      <div className="border-b-4 pb-8 border-dashed">
        <div className="flex  justify-between px-4">
          <img className="w-[150px]" src={showtime?.data?.movie?.image} alt="" />
          <h1 className="text-[#03599d] text-xl font-bold pl-2">
            {showtime?.data?.movie?.name}
          </h1>
        </div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaTag /> <span>Thể loại</span>
          </p>
          <p className="font-bold text-[14px]">
            {showtime?.data?.movie?.genres?.map((item) => (
              <span key={item?.id}>{item?.name},</span>
            ))}
          </p>
        </div>
        <div className="grid grid-cols-2 ml-12 items-center  gap-14 mt-6">
          <p className="flex items-center text-[14px]">
            <FaHistory /> <span>Thời lượng</span>
          </p>
          <p className="font-bold text-[14px]">{showtime?.data?.movie?.duration} phút</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaCalendarDays /> <span>Ngày chiếu</span>
          </p>
          <p className="font-bold text-[14px]">
            {dayjs(showtime?.data?.show_date).format("DD-MM")}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center ml-12  gap-14 mt-8">
          <p className="flex items-center text-[14px]">
            <FaHistory /> <span>Giờ chiếu</span>
          </p>
          <p className="font-bold text-[14px]">{showtime?.data?.start_time}</p>
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
          className="grid grid-cols-2 items-center ml-12  gap-14 mt-8 "
        >
          <p className="flex items-center text-[14px] ">
            <FaDesktop /> <span>Ghế ngồi</span>
          </p>
          <p className="flex flex-wrap font-bold text-[14px]">
            {showtime?.data?.seats?.filter((item: any) => item?.status == 'booking' && item?.user_id == user?.id).map((item: any) => <span key={item?.id}>
              {item?.seat_name},
            </span>)}
          </p>
        </div>
      </div>
      <div className={`flex justify-center space-x-2 ${showtime?.data?.seats?.filter((item: any) => item?.status == 'booking' && item?.user_id == user?.id).length === 0 
        ? " pointer-events-none opacity-60" 
        :""} `}>
      <Link to={"/poly-payment"}>
          <Button
            width="100px"
            onClick={() => {
              booking({
                products: product,
                movie_id: showtime?.data?.movie.id,
                showtime:showtime?.data,
                user_id: user.id,
                showtime_id: showtime?.data?.id,
                seats: showtime?.data?.seats?.filter((item: any) => item?.status == 'booking' && item?.user_id == user?.id),
                total_price: stateProducts.reduce((sum: any, item: any) => {
                  return sum + item?.price * item?.quantity;
                }, 0) +
                  showtime?.data?.seats?.filter((item: any) => item?.status == 'booking' && item?.user_id == user?.id).reduce(
                    (sum: any, seat: any) => sum + seat?.price,
                    0
                  )
              })
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

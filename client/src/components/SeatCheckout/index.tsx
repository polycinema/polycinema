import React, { useEffect, useState } from "react";
import imgNormalActive from "../../../public/img/seat-select-normal.png";
import imgNormalBuy from "../../../public/img/seat-buy-normal.png";
import imgNormal from "../../../public/img/seat-unselect-normal.png";
import imgDouble from "../../../public/img/seat-unselect-double.png";
import imgDoubleActive from "../../../public/img/seat-double-active.png";
import imgVip from "../../../public/img/seat-unselect-vip.png";
import imgVipActive from "../../../public/img/seat-select-vip.png";
import manhinh from "../../../public/img/ic-screen.png";
import imgProduct from "../../../public/img/ic-combo.png";
import imgUser from "../../../public/img/ic-inforpayment.png"

import {
  useGetAllProductsQuery,
  useGetSeatsByShowTimeQuery,
} from "../../redux/api/checkoutApi";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  decreaseProduct,
  increaseProduct,
  removeValueCheckoutSeat,
  setActionToggle,
  setToggle,
  setValueCheckoutSeat,
} from "../../redux/slices/valueCheckoutSlice";
import IsLoading from "../../utils/IsLoading";
import { Button } from "antd";
const SeatCheckout = () => {
  const { id } = useParams();
  const { data: products } = useGetAllProductsQuery();
  const { toggleSeat, valueSeatCheckout, products: stateProducts } = useAppSelector(
    (state) => state.ValueCheckout
  );
  const { data: showtime, isLoading } = useGetSeatsByShowTimeQuery(id || "");
  const dispacth = useAppDispatch();
  const [countdown, setCountdown] = useState(8 * 60);
  const navigate = useNavigate();
  useEffect(() => {
    dispacth(setToggle(showtime?.data?.seats?.map(() => false)));
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [showtime, navigate]);
  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const handleClick = (i: number, seat: object) => {
    dispacth(setActionToggle(i));
    const seatIsSelected = toggleSeat[i];
    if (seatIsSelected) {
      dispacth(removeValueCheckoutSeat(seat.id));
    } else {
      dispacth(setValueCheckoutSeat(seat));
    }
  };

  const getImageSource = (seatIndex: number) => {
    if (showtime?.data?.seats && toggleSeat) {
      if (showtime?.data?.seats.length > seatIndex) {
        const seatType = showtime.data.seats[seatIndex].type;
        switch (seatType) {
          case "single":
            return toggleSeat[seatIndex] || 0 || ""
              ? imgNormalActive
              : imgNormal;
          case "double":
            return toggleSeat[seatIndex] || 0 || ""
              ? imgDoubleActive
              : imgDouble;
          case "special":
            return toggleSeat[seatIndex] || 0 || "" ? imgVipActive : imgVip;
          default:
            return imgNormal;
        }
      }
    }
    return imgNormal;
  };

  return (
    <div className="w-full">
      <div className='m-4'>
        <div className='flex items-center justify-center gap-4 p-2'>
          <img className='w-10' src={imgUser} alt="" />
          <div className='text-3xl '>THÔNG TIN THANH TOÁN</div>
        </div>
        <div className="flex justify-between my-4">
          <div className="flex gap-2 text-xl">
            <p>Họ Và Tên:</p>
            <p>Nguyễn Nho Giang</p>
          </div>
          <div className="flex gap-2 text-xl">
            <p>Email:</p>
            <p>nhogiang03tg@gmail.com</p>
          </div>
        </div>


      </div>
      <div className="flex justify-center items-center space-x-9 p-4   ">
        <div className="flex items-center gap-2">
          <img className="w-8" src={imgNormal} alt="" />
          <p>Ghế trống</p>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-8" src={imgNormalActive} alt="" />
          <p>Ghế đang chọn</p>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-8" src={imgNormalBuy} alt="" />
          <p>Ghế đã bán</p>
        </div>
      </div>
      <img src={manhinh} alt="" />
      <div className=" seat-hidden lg:w-full  ">
        <div className="seat_container seat-scroll  mt-4 ">
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12   ">
            {showtime?.data?.seats?.map(
              (seat: { id: number; seat_name: string }, i: number) => (
                <button
                  key={seat.id}
                  className="w-[40px] relative"
                  onClick={() => {
                    handleClick(i, seat);
                  }}
                >
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                    {seat?.seat_name}
                  </p>
                  <img className="w-full" src={getImageSource(i)} alt="" />
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <div className="md:grid grid-cols-5 gap-4 mt-20 mb-10 p-4 bg-white">
        <div className="flex gap-2 items-center p-2">
          <img className="w-14" src={imgNormal} alt="" />
          <p>Ghế thường</p>
        </div>

        <div className="flex gap-2 items-center p-2">
          <img className="w-14" src={imgVip} alt="" />
          <p>Ghế VIP</p>
        </div>
        <div className="flex gap-2 items-center p-2">
          <img className="w-14 h-10 object-center" src={imgDouble} alt="" />
          <p>Ghế đôi</p>
        </div>
        <div className="">
          <p className="text-xl mt-2">Thời gian còn lại để chọn ghế</p>
          <p>
            {" "}
            {minutes}: {seconds}
          </p>
        </div>
      </div>
      <div>

        <div className="table-product mt-20">
          <div className="flex items-center gap-4">
            <img className="w-10" src={imgProduct} alt="" />
            <div className="text-xl">COMBO ƯU ĐÃI</div>
          </div>
          <table className="w-full mt-8">
            <tr>
              <td></td>
              <td className="text-center">Tên Combo</td>
              <td className="text-center">Giá</td>
              <td className="text-center">Mô Tả</td>
              <td className="text-center">Số Lượng</td>
              <td>Action</td>
            </tr>
            {isLoading ? (
              <IsLoading />
            ) : (
              products?.data?.map(
                (item: {
                  id: number;
                  image: string;
                  name: string;
                  price: number | string;
                  description: string;
                }) => (
                  <tr key={item.id}>
                    <td className="text-center p-2">
                      <img className="w-28" src={item?.image} alt="" />
                    </td>
                    <td className="text-center p-2">{item?.name}</td>
                    <td className="text-center p-2">{item?.price}</td>
                    <td className="text-center p-2">{item?.description}</td>
                    <td className="text-center p-2 ">
                      {stateProducts.find((product) => product.id === item.id)?.quantity || 0}
                    </td>
                    <td>
                      <Button
                        onClick={() => dispacth(decreaseProduct(item.id))}
                      >
                        -
                      </Button>
                      <Button onClick={() => dispacth(increaseProduct(item))}>
                        +
                      </Button>
                    </td>
                  </tr>
                )
              )
            )}
          </table>

          <div className="flex justify-end gap-1 mt-2 text-xl">
            <p className="text-2xl font-bold mt-2">Tổng tiền:</p>
            <p className="text-2xl font-bold mt-2">
              {stateProducts.reduce((sum: any, item: any) => {
                return sum + item.price * item.quantity;
              }, 0) +
                valueSeatCheckout.reduce(
                  (sum, seat) => sum + seat.payload.price,
                  0
                )
              }


              đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatCheckout;

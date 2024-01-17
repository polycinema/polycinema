import React, { useEffect, useState } from "react";
import {
  useUpdateSeatStatusMutation,
} from "../../redux/api/checkoutApi";
import { useNavigate } from "react-router";
import { useGetAllProductsQuery } from "../../redux/api/productApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  decreaseProduct,
  increaseProduct,
  setSeatsToggle,
} from "../../redux/slices/valueCheckoutSlice";
import IsLoading from "../../utils/IsLoading";
import { Button } from "antd";
import imgNormalActive from "../../../public/img/seat-select-normal.png";
import imgNormalBuy from "../../../public/img/seat-buy-normal.png";
import imgNormal from "../../../public/img/seat-unselect-normal.png";
import imgDouble from "../../../public/img/seat-unselect-double.png";
import imgVip from "../../../public/img/seat-unselect-vip.png";
import imgNormalGiu from "../../../public/img/img-seat-normal-giu.png";
import manhinh from "../../../public/img/ic-screen.png";
import imgProduct from "../../../public/img/ic-combo.png";
import imgUser from "../../../public/img/ic-inforpayment.png";
import { formatCurrency } from "../../utils/formatVND";
type Props = {
  showtime: any;
  isLoading: boolean;
  user: any;
};
const SeatCheckout = ({ showtime, isLoading, user }: Props) => {
  const [updateSeatStatus] = useUpdateSeatStatusMutation();
  const { data: products } = useGetAllProductsQuery();
  const { products: stateProducts } = useAppSelector(
    (state) => state.ValueCheckout
  );
  const dispacth = useAppDispatch();
  const navigate = useNavigate();
  const [seatDatas, setSeatDatas] = useState(showtime?.data?.seats || []);
  const storedCountdown = parseInt(localStorage.getItem("countdown")) || 480;
  const storedCounting = localStorage.getItem("counting") === "true" || false;

  const [countdown, setCountdown] = useState(storedCountdown);
  const [counting, setCounting] = useState(storedCounting);

  useEffect(() => {
    localStorage.setItem("countdown", countdown.toString());
    localStorage.setItem("counting", counting.toString());
  }, [countdown, counting]);

  useEffect(() => {
    let interval;

    if (counting && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      navigate("/poly-movies");
    }

    return () => clearInterval(interval);
  }, [counting, countdown]);

  useEffect(() => {
    const channel = window.Echo.channel("seat-reservation");
    const handleReservedEvent = (e) => {
      const updatedSeat = e.seat;
      setSeatDatas((prevSeatData: any) => {
        return prevSeatData?.map((seat: any) =>
          seat.id === updatedSeat.id ? updatedSeat : seat
        );
      });
    };
    channel.listen(".seat.reserved", handleReservedEvent);
    if (showtime?.data?.seats && !seatDatas.length) {
      setSeatDatas(showtime?.data?.seats);
    }
  });

  const handleClick = (seat: any) => {
    if (!counting) {
      setCounting(true);
    }
    const selectedSeats = seatDatas.filter(
      (item) => item.status === "booking" && item.user_id === user.id
    );

    if (selectedSeats.length >= 9) {
      alert(
        "Bạn chỉ được chọn tối đa 8 ghế, vui lòng hủy một ghế để chọn ghế khác"
      );
      return;
    } else if (selectedSeats.length >= 8 && seat.status === "booking") {
      updateSeatStatus({ id: seat.id, status: "unbook", user_id: null });
      return;
    } else if (selectedSeats.length >= 8) {
      alert("Bạn đã chọn đủ 8 ghế, không thể chọn thêm.");
      return;
    }
    if (selectedSeats.length > 0) {
      const lastSelectedSeat = selectedSeats[selectedSeats.length - 1];
      const distance = Math.abs(
        seatDatas.indexOf(seat) - seatDatas.indexOf(lastSelectedSeat)
      );

      if (distance === 2) {
        const middleSeatIndex =
          Math.min(
            seatDatas.indexOf(seat),
            seatDatas.indexOf(lastSelectedSeat)
          ) + 1;
        const middleSeat = seatDatas[middleSeatIndex];

        if (middleSeat && middleSeat.status === "unbook") {
          alert(
            "Không thể chọn 2 ghế cách nhau một ghế khi có ghế trống ở giữa."
          );
          return;
        }
      }
    }
    if (seat.status === "unbook") {
      updateSeatStatus({ id: seat.id, status: "booking", user_id: user?.id });
      dispacth(setSeatsToggle(seat));
    } else if (seat.status === "booking") {
      updateSeatStatus({ id: seat.id, status: "unbook", user_id: null });
      dispacth(setSeatsToggle(seat));
    }
  };
  const groupedSeats = seatDatas.reduce((acc, seatData) => {
    const seatTypeId = seatData.seat_type_id;

    if (!acc[seatTypeId]) {
      acc[seatTypeId] = [seatData];
    } else {
      acc[seatTypeId].push(seatData);
    }

    return acc;
  }, {});
  const groupedSeatsArray = Object.values(groupedSeats);
  return (
    <div className="w-full">
      <div className="m-4">
        <div className="flex items-center justify-center gap-4 p-2">
          <img className="w-10" src={imgUser} alt="" />
          <div className="text-3xl ">THÔNG TIN THANH TOÁN</div>
        </div>
        <div className="flex justify-between my-4">
          <div className="flex gap-2 text-xl">
            <p>Họ Và Tên:</p>
            <p>{user.name}</p>
          </div>
          <div className="flex gap-2 text-xl">
            <p>Email:</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <p className="text-xl mt-2">Thời gian còn lại để chọn ghế:</p>
        <p className="text-2xl mt-2 ">
          {counting ? (
            <>
              {" "}
              {Math.floor(countdown / 60)
                .toString()
                .padStart(2, "0")}
              :{(countdown % 60).toString().padStart(2, "0")}
            </>
          ) : (
            "8:00"
          )}
        </p>
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
          <img className="w-8" src={imgNormalGiu} alt="" />
          <p>Ghế đang giữ</p>
        </div>
        <div className="flex items-center gap-2">
          <img className="w-8" src={imgNormalBuy} alt="" />
          <p>Ghế đã bán</p>
        </div>
      </div>
      <img src={manhinh} alt="" />
      <div className=" seat-hidden lg:w-full  ">
        <div className="seat_container seat-scroll  mt-4 ">
          {groupedSeatsArray.map((dataSeat)=>(
            <div className="flex flex-wrap gap-3 justify-center mt-4">
            {dataSeat?.map(
              (seat: { id: number; seat_name: string }) => (
                <button
                  key={seat.id}
                  className={`w-[40px] relative ${
                    seat.status == "booking" && seat.user_id != user.id
                      ? " pointer-events-none opacity-60 "
                      : ""
                  }`}
                  onClick={() => {
                    handleClick(seat);
                  }}
                >
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 text-[15px]">
                    {seat?.seat_name}
                  </p>
                  <img
                  style={{
                    filter:
                      seat?.status == "booking" && user?.id == seat?.user_id
                        ? "invert(23%) sepia(35%) saturate(600%) hue-rotate(160deg) brightness(94%) contrast(103%)"
                        : seat.status == "booking" &&
                          user.id !== seat?.user_id
                        ? "invert(67%) sepia(23%) saturate(7265%) hue-rotate(179deg) brightness(108%) contrast(95%)"
                        : seat.status == "booked"
                        ? "invert(45%) sepia(100%) saturate(6342%) hue-rotate(359deg) brightness(99%) contrast(110%)"
                        : "",
                  }}
                    className={`w-full`}
                    src={seat?.seat_type?.image}
                    alt=""
                  />
                </button>
              )
            )}
          </div>
          ))}
          
          
          
        </div>
      </div>
      <div className="md:grid grid-cols-4 gap-2 mt-20 mb-10 p-4 bg-white">
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
        <div className="flex justify-end gap-1 mt-2 text-xl">
          <p className="text-2xl font-bold mt-2">Tổng tiền:</p>
          <p className="text-2xl font-bold mt-2">
            {formatCurrency(
              stateProducts.reduce((sum: any, item: any) => {
                return sum + item.price * item.quantity;
              }, 0) +
                showtime?.data?.seats
                  ?.filter(
                    (item: any) =>
                      item?.status == "booking" && item?.user_id == user.id
                  )
                  .reduce((sum: any, seat: any) => sum + seat.price, 0)
            )}
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
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center"></td>
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
                      <img className="w-28 h-28 rounded-full object-cover" src={item?.image} alt="" />
                    </td>
                    <td className="text-center p-2">{item?.name}</td>
                    <td className="text-center p-2">
                      {formatCurrency(item?.price)}
                    </td>
                    <td className="text-center p-2">{item?.description}</td>
                    <td className="text-center p-2 flex justify-center items-center gap-2 pt-[50px]">
                      <Button
                        onClick={() => dispacth(decreaseProduct(item.id))}
                      >
                        -
                      </Button>
                      <p>
                        {stateProducts.find(
                          (product: any) => product.id === item.id
                        )?.quantity || 0}
                      </p>
                      <Button onClick={() => dispacth(increaseProduct(item))}>
                        +
                      </Button>
                    </td>
                  </tr>
                )
              )
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeatCheckout;

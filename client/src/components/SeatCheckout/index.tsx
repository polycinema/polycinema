import React, { useState } from "react";
import seat1 from "../../../public/img/seat-select-normal.png";
import seat2 from "../../../public/img/seat-buy-normal.png";
import seatdouble from "../../../public/img/seat-unselect-double.png";
import seatnormal from "../../../public/img/seat-unselect-normal.png";
import seatvip from "../../../public/img/seat-unselect-vip.png";
import manhinh from "../../../public/img/ic-screen.png";
const SeatCheckout = () => {
        const [seatNormal,setSeatNormal] = useState("seat-normal")
  return (
        <div >
        <div className="flex justify-center items-center space-x-9 p-4   ">
          <div className="flex items-center gap-2">
            <img className="w-8" src={seatnormal} alt="" />
            <p>Ghế trống</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-8" src={seat1} alt="" />
            <p>Ghế đang chọn</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-8" src={seat2} alt="" />
            <p>Ghế đã bán</p>
          </div>
        </div>
        <img src={manhinh} alt="" />
        <div className=" overflow-x-hidden  ">
          <div className="seat_container overflow-x-scroll md:mx-10 mt-4 ">
            <div className="grid grid-cols-12 w-[700px] p-2 ">
              <button className={`seat ${seatNormal} `} onClick={()=> seatNormal =="seat-normal"? setSeatNormal("seat-normal-active"):setSeatNormal("seat-normal")}>J15</button>
              <button className="seat seat-vip">I15</button>
              <button className="seat seat-double">I15</button>
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-5 gap-4 mt-20 mb-10 p-4 bg-white">
          <div className="flex gap-2 items-center p-2">
            <img className="w-14" src={seatnormal} alt="" />
            <p>Ghế thường</p>
          </div>

          <div className="flex gap-2 items-center p-2">
            <img className="w-14" src={seatvip} alt="" />
            <p>Ghế VIP</p>
          </div>
          <div className="flex gap-2 items-center p-2">
            <img
              className="w-14 h-10 object-center"
              src={seatdouble}
              alt=""
            />
            <p>Ghế đôi</p>
          </div>
          <div>
            <p className="text-2xl font-bold mt-2">Tổng tiền</p>
            <p>10.000đ</p>
          </div>
          <div>
            <p className="text-2xl mt-2">Thời gian còn lại</p>
            <p>4:20</p>
          </div>
        </div>
      </div>
  )
}

export default SeatCheckout
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import icon_v from "../../../public/img/img-v.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useCheckoutBookingMutation } from "../../redux/api/checkoutApi";
import { formatCurrency } from "../../utils/formatVND";
import { deleteTotalPrice, deleteValueProduct } from "../../redux/slices/valueCheckoutSlice";

const PayementReturnPage = () => {
  const { booking } = useAppSelector((state) => state.ValueCheckout);
  const [addBooking] = useCheckoutBookingMutation();
  const location = useLocation();
  const dispatch = useAppDispatch()
  const queryParams = new URLSearchParams(location.search);
  const vnpAmount = queryParams.get("vnp_Amount");
  const vnpTransactionStatus = queryParams.get("vnp_TransactionStatus");
  const vnpTxnRef = queryParams.get("vnp_TxnRef");

  useEffect(() => {
    addBooking({ ...booking.payload, booking_id: vnpTxnRef, coupon_id: "1" }).unwrap().then(() => {
      dispatch(deleteValueProduct())
      dispatch(deleteTotalPrice());
    })
  }, [booking]);
  return (
    <>
      <div className="max-w-[1150px] mx-auto my-20 py-10">
        {vnpTransactionStatus != "00" ? (
          <>
            <div className="text-red-500 text-6xl text-center">
              Thanh toán thất bại
            </div>
            <div className="flex justify-center gap-24 mt-10">
              <div className="flex gap-1 text-xl">
                <p className="font-bold">Mã thanh toán:</p>
                <p>#00000</p>
              </div>
              <div className="flex gap-1 text-xl">
                <p className="font-bold">Tổng tiền:</p>
                <p>00000</p>
              </div>
            </div>
            <div className="text-center my-10  text-xl">
              Kiểu thanh toán : Không có
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="space-y-5">
                <div className="flex justify-center">
                  <img className="w-20" src={icon_v} alt="" />
                </div>
                <h1 className="text-4xl text-[#15C0EA]">
                  Thanh toán thành công
                </h1>
              </div>
            </div>
            <div className="flex justify-center gap-24 mt-10">
              <div className="flex gap-1 text-xl">
                <p className="font-bold">Mã thanh toán:</p>
                <p>#{vnpTxnRef}</p>
              </div>
              <div className="flex gap-1 text-xl">
                <p className="font-bold">Tổng tiền:</p>
                <p>{formatCurrency(vnpAmount / 100)}</p>
              </div>
            </div>
            <div className="text-center my-10  text-xl">
              Kiểu thanh toán : Online
            </div>
          </>
        )}

        <Link to={"/"} className="flex justify-center">
          <Button>Quay về trang chủ</Button>
        </Link>
      </div>
    </>
  );
};

export default PayementReturnPage;
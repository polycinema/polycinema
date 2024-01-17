import React, { useEffect, useState } from "react";
import ButtonCustom from "../../components/Button";
import { Button, Modal } from "antd";
import { usePaymentBookingMutation } from "../../redux/api/paymentApi";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router";
import "./index.css";
import { useGetCouponByIdUserQuery } from "../../redux/api/couponApi";
import logo from "../../../public/img/logo.png";
import { formatCurrency } from "../../utils/formatVND";
import { setCoupon } from "../../redux/slices/valueCheckoutSlice";
import { BiAlarm } from "react-icons/bi";
import dayjs from "dayjs";
import IsLoading from "../../utils/IsLoading";

const PaymentPage = () => {
  const [paymentBooking, { isLoading }] = usePaymentBookingMutation();
  const { booking, coupon: selectedCoupon } = useAppSelector(
    (state) => state.ValueCheckout
  );
  const { user } = useAppSelector((state) => state.Authorization);
  const { data: coupons, isLoading: isLoadingCoupon } =
    useGetCouponByIdUserQuery(user?.id || 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const calculateDiscount = (coupon) => {
    if (coupon.type === "discount_percentage") {
      return booking?.payload?.total_price * (coupon.discount / 100);
    } else if (coupon.type === "discount_amount") {
      return coupon.discount;
    }
    return 0;
  };
  const totalAmount =
    booking?.payload?.total_price -
    (selectedCoupon ? calculateDiscount(selectedCoupon) : 0);
  console.log(
    "total_booking:",
    booking?.payload?.total_price,
    "Coupon:",
    coupons
  );

  const onClickPaymentBooking = () => {
    paymentBooking({
      vnp_OrderInfo: "Thanh toan ve xem phim",
      vnp_OrderType: "190000",
      vnp_Amount: `${totalAmount}`,
    })
      .unwrap()
      .then((res) => (window.location.href = res.data))
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    navigate("/poly-movies");
  };

  const onClickCoupon = (coupon) => {
    selectedCoupon?.coupon_code === coupon?.coupon_code
      ? dispatch(setCoupon(null))
      : dispatch(setCoupon(coupon));
  };
  const storedCountdown = parseInt(localStorage.getItem("countdown")) || 480;

  const [countdown, setCountdown] = useState(storedCountdown);

  useEffect(() => {
    localStorage.setItem("countdown", countdown.toString());
  }, [countdown]);

  useEffect(() => {
    let interval;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      navigate("/poly-movies");
    }

    return () => clearInterval(interval);
  }, [ countdown]);

  return (
    <div className="w-[100vh] h-[65vh] PaymentPage_container">
      
      <Modal
        title={`Xác nhận đặt vé| ${Math.floor(countdown / 60)
        .toString()
        .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`}
        width={950}
        style={{ height: "700px" }}
        bodyStyle={{ maxHeight: "800px", overflow: "auto" }}
        open={true}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <ButtonCustom onClick={onClickPaymentBooking}>
            {isLoading ? (
              <div className="flex justify-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Thanh toán"
            )}
          </ButtonCustom>,
        ]}
      >
        <div className="order-confirmation p-6 bg-white border rounded-md shadow-md w-full">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Tên:</span>
              <span className="text-gray-600">{user?.name}</span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Email:</span>
              <span className="text-gray-600">{user?.email}</span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Phim:</span>
              <span className="text-gray-600">
                {booking?.payload?.showtime?.movie?.name}
              </span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Ghế ngồi:</span>
              <span className="text-gray-600">
                {booking?.payload?.seats?.map((seat) => (
                  <span key={seat?.id}>{seat?.seat_name},</span>
                ))}
              </span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Phòng:</span>
              <span className="text-gray-600">
                {booking?.payload?.showtime?.room?.room_name}
              </span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Giờ chiếu:</span>
              <span className="text-gray-600">
                {booking?.payload?.showtime?.start_time}{" "}
              </span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Combo kèm theo:</span>
              <span className="text-gray-600">
                {booking?.payload?.products?.map((product) => (
                  <span key={product?.id}>{product?.name}</span>
                ))}{" "}
              </span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Ngày chiếu:</span>
              <span className="text-gray-600">
                {dayjs(booking?.payload?.showtime?.show_date).format(
                  "DD/MM/YYYY"
                )}
              </span>
            </div>
            <div className=" text-xl space-y-2">
              <div>
                <span className="font-semibold mr-2">Giá tiền:</span>
                <span className="text-[#0D5D9F] font-semibold">
                  {formatCurrency(booking?.payload?.total_price)}
                </span>
              </div>
              <div>
                <span className="font-semibold mr-2">Mã giảm:</span>
                <span className="text-[#0D5D9F] font-semibold">
                  {selectedCoupon?.coupon_code}
                </span>
              </div>
              <div>
                <span className="font-semibold mr-2">Thành tiền:</span>
                <span className="text-[#0D5D9F] font-semibold">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="voucher-list p-6 bg-white border rounded-md shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-4">Chọn Voucher</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {isLoadingCoupon ? (
              <div className="flex justify-center">
                <IsLoading />
              </div>
            ) : (
              coupons?.data?.map((coupon) => (
                <div key={coupon?.id} className="flex">
                  <div className="bg-[#0D5D9F] p-1  rounded-l-md">
                    <img
                      className="w-36 flex justify-center"
                      src={logo}
                      alt=""
                    />
                    <p className="text-center text-white font-bold">
                      {coupon?.coupon_code}
                    </p>
                  </div>
                  <div className="w-fit flex items-center space-x-3 p-2 border-2 border-gray-200 ">
                    <div>
                      <p className="text-sm pl-1">
                        -Giảm:{" "}
                        {coupon?.type === "discount_percentage" ? (
                          <span>{coupon?.discount}%</span>
                        ) : (
                          <span>{formatCurrency(coupon?.discount)}</span>
                        )}
                      </p>
                      <p>{coupon?.description}</p>
                      <p>{`Vocher sử dụng cho đơn hàng giá trị trên ${formatCurrency(
                        coupon?.min_order_value
                      )}`}</p>
                      <p className="flex items-center text-[#0D5D9F]">
                        <span>
                          <BiAlarm />
                        </span>
                        <span className="text-sm">
                          Ngày hết hạn:{" "}
                          {dayjs(coupon?.expires_at).format("DD-MM-YYYY")}
                        </span>
                      </p>
                    </div>
                    <div
                      className={`${
                        booking?.payload?.total_price <= coupon?.min_order_value
                          ? "pointer-events-none opacity-60"
                          : ""
                      }`}
                    >
                      <Button
                        className={`border border-[#0D5D9F]`}
                        onClick={() => onClickCoupon(coupon)}
                      >
                        {selectedCoupon?.coupon_code === coupon.coupon_code
                          ? "Hủy"
                          : "Áp dụng"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentPage;

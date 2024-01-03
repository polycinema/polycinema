import React, { useState } from 'react';
import ButtonCustom from '../../components/Button';
import { Modal } from 'antd';
import { usePaymentBookingMutation } from '../../redux/api/paymentApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import './index.css';
import { useGetCouponByIdQuery, useGetCouponByIdUserQuery } from '../../redux/api/couponApi';
import { formatCurrency } from '../../utils/formatVND';
import { setCoupon } from '../../redux/slices/valueCheckoutSlice';

const PaymentPage = () => {
  const [paymentBooking, { isLoading }] = usePaymentBookingMutation();
  const { booking } = useAppSelector((state) => state.ValueCheckout);
  const { user } = useAppSelector((state) => state.Authorization);
  const { data: coupon, isLoading: isLoadingCoupon } = useGetCouponByIdUserQuery(user?.id || 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const calculateDiscount = (coupon) => {
    if (coupon.type === "discount_percentage") {
      return (booking?.payload?.total_price * (coupon.discount / 100));
    } else if (coupon.type === "discount_amount") {
      return coupon.discount;
    }
    return 0;
  };

  const totalAmount = booking?.payload?.total_price - (selectedCoupon ? calculateDiscount(selectedCoupon) : 0);

  const onClickPaymentBooking = () => {
    paymentBooking({
      vnp_OrderInfo: "Thanh toan ve xem phim",
      vnp_OrderType: "190000",
      vnp_Amount: `${totalAmount}`
    })
      .unwrap()
      .then((res) => window.location.href = res.data)
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    navigate("/");
  };

  const onChangeCoupon = (selectedCoupon) => {
    setSelectedCoupon(selectedCoupon);
    dispatch(setCoupon(selectedCoupon));
    
  };

  const clearSelectedCoupon = () => {
    setSelectedCoupon(null);
  };

  return (
    <div className='w-[100vh] h-[65vh] PaymentPage_container'>
      <Modal
        title="Xác nhận đặt vé"
        width={950}
        style={{ height: '600px' }}
        bodyStyle={{ maxHeight: '500px', overflow: 'auto' }}
        open={true}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <ButtonCustom onClick={onClickPaymentBooking}>
            {isLoading ? (
              <div className='flex justify-center'>
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
              <span className="text-gray-600">Avengers: Endgame</span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Ghế ngồi:</span>
              <span className="text-gray-600"></span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Phòng:</span>
              <span className="text-gray-600"></span>
            </div>
            <div className="flex items-center text-xl">
              <span className="font-semibold mr-2">Thời gian bắt đầu:</span>
              <span className="text-gray-600">, ngày </span>
            </div>
            <div className=" text-xl space-y-2">
              <div>
              <span className="font-semibold mr-2">Giá tiền:</span>
              <span className="text-[#3db1f3] font-semibold">{formatCurrency(booking?.payload?.total_price)}</span>
              </div>
              <div>
              <span className="font-semibold mr-2">Mã giảm:</span>
              <span className="text-[#3db1f3] font-semibold">{selectedCoupon?.coupon_code }</span>
              </div>
              <div>
              <span className="font-semibold mr-2">Thành tiền:</span>
              <span className="text-[#3db1f3] font-semibold">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
            
          </div>
        </div>
        <div className="voucher-list p-6 bg-white border rounded-md shadow-md mt-4">
          <h3 className="text-lg font-semibold mb-4">Chọn Voucher</h3>
          <div className='flex  bg-gray-100 p-2 space-x-2 items-center my-2'>
            <p className='text-xl'>Mã Voucher:</p>
            <form action="">
              <input type="text" placeholder='Nhập mã voucher...' className='border border-gray-300 p-2 w-[500px]' />
              <button className='p-2 bg-white mx-2 '>Áp dụng</button>
            </form>
          </div>
          <div className='grid grid-cols-2
          gap-2
          '>
          <div className='flex gap-1 w-full p-4'>
            <input
              type="radio"
              name="voucher"
              checked={!selectedCoupon}
              onChange={clearSelectedCoupon}
            />
            <p>Không chọn voucher</p>
          </div>
          {
            isLoadingCoupon
              ? "Loading..."
              : (
                coupon?.data?.map((item) => (
                  <div key={item?.id}>
                    <div className='flex gap-1 w-full p-4 border-1 border-gray-400 bg-[#98ceed] '>
                      <input
                        type="radio"
                        name="voucher"
                        onChange={() => onChangeCoupon(item)}
                      />
                      <p>
                        {item?.coupon_code} - Giảm {
                          item.type === "discount_percentage"
                            ? <span>{item.discount}%</span>
                            : item.type === "discount_amount"
                              ? <span>{item.discount}đ</span>
                              : ""}
                      </p>
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
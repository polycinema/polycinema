import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import icon_v from '../../../public/img/img-v.png'
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { useCheckoutBookingMutation } from '../../redux/api/checkoutApi';

const PayementReturnPage = () => {
        const {booking}= useAppSelector((state) => state.ValueCheckout);
        console.log(booking);
        
        const[ addBooking] = useCheckoutBookingMutation()
        const location = useLocation();
        const queryParams = new URLSearchParams(location.search);
        const vnpAmount = queryParams.get('vnp_Amount');
        const vnpTransactionStatus = queryParams.get('vnp_TransactionStatus');
        const vnpTxnRef = queryParams.get('vnp_TxnRef')
        const formatCurrency = (amount) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount/100);
        };
        useEffect(()=>{
                addBooking({...booking.payload, booking_id:vnpTxnRef})
                
        },[booking])
        return (
                <>
                
                <div className='max-w-[1150px] mx-auto my-20'>
                        {vnpTransactionStatus != "00" ? <div className='text-red text-4xl text-center'>Thanh toán thất bại</div>:
                        <>
                        <div className='flex justify-center'>
                                <div className='space-y-5'>
                                        <div className='flex justify-center'>
                                                <img className='w-20' src={icon_v} alt="" />

                                        </div>
                                        <h1 className='text-4xl text-[#15C0EA]'>Thanh toán thành công</h1>
                                </div>


                        </div>
                        <div className='flex justify-center gap-24 mt-10'>
                                <div className='flex gap-1 text-xl'>
                                        <p className='font-bold'>Mã thanh toán:</p>
                                        <p>#{vnpTxnRef}</p>
                                </div>
                                <div className='flex gap-1 text-xl'>
                                        <p className='font-bold'>Tổng tiền:</p>
                                        <p>{formatCurrency(vnpAmount)}</p>
                                </div>
                        </div>
                        <div className='text-center my-10  text-xl'>Kiểu thanh toán : Online</div>
                        </>}
                        


                        <Link to={"/"} className='flex justify-center'>
                                <Button >Quay về trang chủ</Button>

                        </Link>
                </div>
                </>
                
        )
}

export default PayementReturnPage
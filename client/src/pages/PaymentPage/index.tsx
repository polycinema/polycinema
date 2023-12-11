import React, { useEffect, useState } from 'react'
import ButtonCustom from '../../components/Button'
import { Modal } from 'antd'
import { usePaymentBookingMutation } from '../../redux/api/paymentApi'
import { useAppSelector } from '../../store/hook'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router'


const PaymentPage = () => {
  const navigate = useNavigate()
  const { booking: valueBooking } = useAppSelector((state) => state.ValueCheckout)

  const [paymentBooking, { isLoading }] = usePaymentBookingMutation()
  const onClickPaymentBooking = () => {
    paymentBooking({
      vnp_TxnRef: "12346",
      vnp_OrderInfo: "Thanh toan ve xem phim",
      vnp_OrderType: "190000",
      vnp_Amount: `${valueBooking.payload.total_price}`

    })
      .unwrap()
      .then((res) => window.location.href = res.data)
      .catch((err) => console.log(err))
      
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);

  }, [])



  const handleCancel = () => {
    setIsModalOpen(false);

  };
  return (
    <Modal title="Điều khoản thanh toán"  open={isModalOpen} onCancel={handleCancel}>
      <ButtonCustom onClick={onClickPaymentBooking}>{isLoading ? (
        <div className='flex justify-center'>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </div>
      ) : (
        "Thanh toán"
      )} </ButtonCustom>
    </Modal>
  );

}

export default PaymentPage
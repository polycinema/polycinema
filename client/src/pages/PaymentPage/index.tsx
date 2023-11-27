import React from 'react'
import { useAppSelector } from '../../store/hook'

type Props = {}

const PaymentPage = (props: Props) => {
        const {booking} = useAppSelector((state)=> state.ValueCheckout)
        console.log(booking);
        
  return (
    <div>index</div>
  )
}

export default PaymentPage
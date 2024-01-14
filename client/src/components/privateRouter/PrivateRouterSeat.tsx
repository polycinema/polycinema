import {  Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { useEffect } from "react";
import { useUpdateSeatStatusMutation } from "../../redux/api/checkoutApi";
import { deleteSeatsToggle } from "../../redux/slices/valueCheckoutSlice";
const PrivateRouterSeat = () => {
  const { toggleSeat } = useAppSelector((state) => state.ValueCheckout);
  const dispatch = useAppDispatch()
  const [updateStattusSeat] = useUpdateSeatStatusMutation()
  localStorage.removeItem('countdown')
  localStorage.removeItem('counting')
  useEffect(() => {
        if(toggleSeat?.length > 0){
        toggleSeat?.map(item=>updateStattusSeat({ id: item.id, status: "unbook", user_id: null })
        .then(()=>{
                dispatch(deleteSeatsToggle())
        }))}
  }, [toggleSeat]);
  return  <Outlet /> ;
};

export default PrivateRouterSeat;
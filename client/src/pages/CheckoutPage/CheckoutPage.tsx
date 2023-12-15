
import { useEffect } from "react";
import CardCheckout from "../../components/CardCheckout";
import { Outlet } from "react-router";
import { useAppDispatch } from "../../store/hook";
import { deleteTotalPrice, deleteValueCheckoutSeat, deleteValueProduct } from "../../redux/slices/valueCheckoutSlice";
const CheckoutPage = () => {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(deleteTotalPrice())
    dispatch(deleteValueCheckoutSeat())
    dispatch(deleteValueProduct())
  },[])
  return (
    <div className=" max-w-[1150px] mx-auto py-4 ">
      <div className="md:grid grid-cols-3 gap-4 ">
        <div className="col-span-2 p-4 ">
        <Outlet/>
        </div>
        <div className="bg-white p-4">
          <CardCheckout />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

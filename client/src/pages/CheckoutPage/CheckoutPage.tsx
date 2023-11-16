
import "./Checkout.css";
import CardCheckout from "../../components/CardCheckout";
import { Outlet } from "react-router";
const CheckoutPage = () => {
  
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

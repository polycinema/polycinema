
import CardCheckout from "../../components/CardCheckout";
import {  useParams } from "react-router";
import {  useAppSelector } from "../../store/hook";
import SeatCheckout from "../../components/SeatCheckout";
import { useGetSeatsByShowTimeQuery } from "../../redux/api/checkoutApi";
const CheckoutPage = () => {
  const { id } = useParams();
  const { data: showtime, isLoading } = useGetSeatsByShowTimeQuery(id || "");
  const { user } = useAppSelector(
    (state) => state.Authorization
  );
  
  return (
    <div className=" max-w-[1150px] mx-auto py-4 ">
      <div className="md:grid grid-cols-3 gap-4 ">
        <div className="col-span-2 p-4 ">
        <SeatCheckout 
        showtime={showtime} 
        isLoading={isLoading}
        user={user}
        
        />
        </div>
        <div className="bg-white p-4">
          <CardCheckout 
          showtime={showtime} 
          isLoading={isLoading}
          user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

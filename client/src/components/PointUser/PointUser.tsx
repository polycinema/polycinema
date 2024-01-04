import { useGetCouponByIdUserQuery } from "../../redux/api/couponApi";
import { useAppSelector } from "../../store/hook";
import logo from "../../../public/img/logo.png";
import { BiAlarm } from "react-icons/bi";
import { formatCurrency } from "../../utils/formatVND";
import dayjs from "dayjs";
import IsLoading from "../../utils/IsLoading";
const PointUser = () => {
  const { user } = useAppSelector((state) => state.Authorization);
  const { data: coupons, isLoading } = useGetCouponByIdUserQuery(user?.id || 0);
  return (
    <div className=" max-w-6xl m-auto pt-5">
      <div className="bg-[#FFFFFF]">
        <hr />
        <h1 className="mx-4 pt-2 text-[#0D5D9F] text-2xl">Tất cả voucher</h1>
        <div className="mx-8 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="flex justify-center">
              <IsLoading />
            </div>
          ) : (
            coupons?.data?.map((coupon) => (
              <div key={coupon?.id} className="flex">
                <div className="bg-[#0D5D9F] p-1  rounded-l-md">
                  <img className="w-36 flex justify-center" src={logo} alt="" />
                  <p className="text-center text-white font-bold">
                    {coupon?.coupon_code}
                  </p>
                </div>
                <div className="w-fit p-2 border-2 border-gray-200 ">
                  <p className="text-sm pl-1">
                    -Giảm:{" "}
                    {coupon?.type === "discount_percentage" ? (
                      <span>{coupon?.discount}%</span>
                    ) : (
                      <span>{formatCurrency(coupon?.discount)}</span>
                    )}
                  </p>
                  <p>{coupon?.description}</p>
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
              </div>
            ))
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default PointUser;

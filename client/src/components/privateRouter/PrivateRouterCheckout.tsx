import { Navigate, Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../store/hook";
import { useEffect } from "react";
const PrivateRouterCheckout = () => {
  const { isAuth } = useAppSelector((state) => state.Authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/poly-acount");
    }
  }, [isAuth]);
  return isAuth ? <Outlet /> : <Navigate to={"/poly-acount"} />;
};

export default PrivateRouterCheckout;
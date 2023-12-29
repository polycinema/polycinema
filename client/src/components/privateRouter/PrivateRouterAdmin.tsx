import { Navigate, Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../store/hook";
import { useEffect } from "react";
const PrivateRouterAdmin = () => {
  const { isAuth,user } = useAppSelector((state) => state.Authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "admin" && !isAuth ) {      
      navigate("/");
    }
  }, [user,isAuth]);
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRouterAdmin;


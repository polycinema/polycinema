import { Navigate, Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../store/hook";
import { useEffect } from "react";
const PrivateRouterAdmin = () => {
  const { user } = useAppSelector((state) => state.Authorization);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "admin" ) {      
      navigate("/");
    }
  }, [user]);
  return user?.role == "admin" ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRouterAdmin;


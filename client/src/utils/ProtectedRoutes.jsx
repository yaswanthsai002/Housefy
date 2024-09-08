import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import useSessionValidation from "../hooks/useSessionValidation";

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {isTokenValid, isLoading} = useSessionValidation(currentUser);
  if (isLoading === null)
    return <TailSpin />;
  if (isLoading) {
    return <TailSpin />;
  }
  return isTokenValid ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;

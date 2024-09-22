import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import useSessionValidation from "../hooks/useSessionValidation";

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isTokenValid, isLoading } = useSessionValidation(currentUser);
  if (isLoading === null)
    return (
      <div className="flex items-center justify-center md:min-h-[calc(100vh-80px)] min-h-[calc(100vh-64px)]">
        <TailSpin
          color="skyblue"
          height="80"
          width="80"
          radius="9"
          ariaLabel="loading"
        />
      </div>
    );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center md:min-h-[calc(100vh-80px)] min-h-[calc(100vh-64px)]">
        <TailSpin
          color="skyblue"
          height="80"
          width="80"
          radius="9"
          ariaLabel="loading"
        />
      </div>
    );
  }
  return isTokenValid ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoutes;

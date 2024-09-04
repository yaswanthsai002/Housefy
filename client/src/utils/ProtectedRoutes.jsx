import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"
const ProtectedRoutes = () => {
  const {currentUser} = useSelector((state) => state.user);
  const jwtToken = Cookies.get("jwt_token");
  // console.log('Token', jwtToken);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;

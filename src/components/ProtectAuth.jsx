import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectAuth = () => {
  const { auth } = useAuth();
  console.log(Boolean(auth?.user));
  const location = useLocation();
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectAuth;

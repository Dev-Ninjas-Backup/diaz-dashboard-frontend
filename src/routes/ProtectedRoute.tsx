// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to continue", {
        id: "auth-required",
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

/* eslint-disable react-hooks/exhaustive-deps */

import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useEffect } from "react";

export default function AuthLayout() {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

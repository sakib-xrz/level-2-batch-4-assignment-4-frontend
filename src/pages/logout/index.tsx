import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
    navigate("/");

    // eslint-disable-next-line
  }, []);
  return null;
}

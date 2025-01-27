import { ReactNode } from "react";
import { logout, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyUser";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type TPrivateRoute = {
  children: ReactNode;
  role: string[] | undefined;
};

export default function PrivateRoute({ children, role }: TPrivateRoute) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  const requestedRoute = window.location.pathname;

  if (!token) {
    dispatch(logout());
    toast.error("You are not authorized to access this page");
    return (
      <Navigate
        to={
          requestedRoute === "/login" || requestedRoute === "/register"
            ? requestedRoute
            : `/login?next=${requestedRoute}`
        }
        replace={true}
      />
    );
  }

  // @ts-expect-error: token is not null
  const { role: currentUserRole } = verifyToken(token as string);

  let isAuthorized;

  if (role && currentUserRole) {
    isAuthorized = role.includes(currentUserRole);
  }

  if (!isAuthorized) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}

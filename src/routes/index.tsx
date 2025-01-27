import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/main-layout";
import AuthLayout from "../layout/auth-layout";
import DashboardLayout from "../layout/dashboard-layout";

import publicRouteChildren from "./public-route-children";
import authRouteChildren from "./auth-route-children";
import privateRouteChildren from "./private-route-children";
import dashboardRouteChildren from "./dashboard-route-children";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: publicRouteChildren,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: authRouteChildren,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: privateRouteChildren,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: dashboardRouteChildren,
  },
]);

export default router;

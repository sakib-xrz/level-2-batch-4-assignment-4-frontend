import Login from "../pages/login";
import Register from "../pages/register";

const authRouteChildren = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default authRouteChildren;

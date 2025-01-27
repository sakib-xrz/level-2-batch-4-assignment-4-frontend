import Home from "../pages/home";
import Products from "../pages/products";

const publicRouteChildren = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
];

export default publicRouteChildren;

import Home from "../pages/home";
import PaymentCancel from "../pages/payment-cancel";
import PaymentFail from "../pages/payment-fail";
import PaymentSuccess from "../pages/payment-success";
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
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-fail",
    element: <PaymentFail />,
  },
  {
    path: "/payment-cancel",
    element: <PaymentCancel />,
  },
];

export default publicRouteChildren;

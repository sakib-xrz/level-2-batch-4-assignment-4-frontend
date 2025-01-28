import Home from "../pages/home";
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
];

export default publicRouteChildren;

// "payment-success"
// "payment-fail"
// "payment-cancel"

import Home from "../pages/home";
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
];

export default publicRouteChildren;

// "payment-success"
// "payment-fail"
// "payment-cancel"

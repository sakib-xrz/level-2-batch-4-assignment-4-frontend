import PrivateRoute from "../layout/private-route";

import Checkout from "../pages/checkout";

const privateRouteChildren = [
  {
    path: "checkout",
    element: (
      <PrivateRoute role={["CUSTOMER"]}>
        <Checkout />
      </PrivateRoute>
    ),
  },
];

export default privateRouteChildren;

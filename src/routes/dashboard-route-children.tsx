import PrivateRoute from "../layout/private-route";
import AllProducts from "../pages/all-products";
import AddProduct from "../pages/all-products/add";
import EditProduct from "../pages/all-products/edit";
import MyOrder from "../pages/my-order";
import Orders from "../pages/orders";
import Profile from "../pages/profile";

const dashboardRouteChildren = [
  {
    path: "profile",
    element: (
      <PrivateRoute role={["CUSTOMER", "ADMIN"]}>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "my-orders",
    element: (
      <PrivateRoute role={["CUSTOMER"]}>
        <MyOrder />
      </PrivateRoute>
    ),
  },
  {
    path: "all-products",
    element: (
      <PrivateRoute role={["ADMIN"]}>
        <AllProducts />
      </PrivateRoute>
    ),
  },
  {
    path: "all-products/add",
    element: (
      <PrivateRoute role={["ADMIN"]}>
        <AddProduct />
      </PrivateRoute>
    ),
  },
  {
    path: "all-products/edit/:id",
    element: (
      <PrivateRoute role={["ADMIN"]}>
        <EditProduct />
      </PrivateRoute>
    ),
  },
  {
    path: "orders",
    element: (
      <PrivateRoute role={["ADMIN"]}>
        <Orders />
      </PrivateRoute>
    ),
  },
];

export default dashboardRouteChildren;

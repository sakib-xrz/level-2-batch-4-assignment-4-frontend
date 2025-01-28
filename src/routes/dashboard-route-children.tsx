import PrivateRoute from "../layout/private-route";
import AllProducts from "../pages/all-products";
import AddProduct from "../pages/all-products/add";
import EditProduct from "../pages/all-products/edit";
import MyOrders from "../pages/my-orders";
import Orders from "../pages/orders";
import Profile from "../pages/profile";
import Users from "../pages/users";

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
    path: "users",
    element: (
      <PrivateRoute role={["ADMIN"]}>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "my-orders",
    element: (
      <PrivateRoute role={["CUSTOMER"]}>
        <MyOrders />
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

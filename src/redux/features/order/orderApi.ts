import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: "/orders/my-orders",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    uodateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: [tagTypes.order],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetMyOrdersQuery,
  useUodateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

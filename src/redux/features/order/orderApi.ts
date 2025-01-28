import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (query) => ({
        url: "/orders",
        method: "GET",
        params: query,
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
    updateOrderStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: data,
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
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;

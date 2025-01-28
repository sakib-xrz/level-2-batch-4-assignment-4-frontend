import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (query) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetCustomersQuery, useBlockUserMutation } = userApi;

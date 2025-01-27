import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/profile",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;

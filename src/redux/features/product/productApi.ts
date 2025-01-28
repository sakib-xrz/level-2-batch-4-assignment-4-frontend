import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({
        url: "/products",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    editProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;

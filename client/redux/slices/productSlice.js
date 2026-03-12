import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "productSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8015",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/getproducts",
      providesTags: ["Products"],
    }),

    // // 🔹 Get Products By Range (Pagination)
    // getProductsByRange: builder.query({
    //   query: ({ start, end }) => `/range?start=${start}&end=${end}`,
    //   providesTags: ["Products"],
    // }),

    createProduct: builder.mutation({
      query: (newData) => ({
        url: "/createproduct",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/updateproduct/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteproduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  //useGetProductsByRangeQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
export default productSlice;

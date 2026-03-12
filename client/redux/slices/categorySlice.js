import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categorySlice = createApi({
  reducerPath: "categorySlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8015",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/getcategories",
      providesTags: ["Categories"],
    }),
    /*getCategoryChildren: builder.query({
      query: (categoryId) => `categories/${categoryId}/children`, // Dynamic endpoint
    }),*/
    createCategory: builder.mutation({
      query: (newData) => ({
        url: "/createcategory",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/editcategory/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/deletecategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  //useGetCategoryChildrenQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
export default categorySlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const registerSlice = createApi({
  reducerPath: "registerSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8015",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/getusers",
      providesTags: ["Users"],
    }),
    createUser: builder.mutation({
      query: (newData) => ({
        url: "/registeruser",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/editreg/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delreg/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = registerSlice;
export default registerSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postSlice = createApi({
  reducerPath: "postSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8015",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/getposts",
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (newData) => ({
        url: "/createtepost",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/editpost/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/deletepost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postSlice;
export default postSlice;

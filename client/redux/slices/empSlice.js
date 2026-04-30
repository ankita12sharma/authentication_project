import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const empSlice = createApi({
  reducerPath: "empSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8015",
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/getemp",
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation({
      query: (newData) => ({
        url: "/createemp",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, ...updateEmp }) => ({
        url: `/editemp/${id}`,
        method: "PUT",
        body: updateEmp,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/deleteemp/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});
export const {
  useCreateEmployeeMutation,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = empSlice;
export default empSlice;

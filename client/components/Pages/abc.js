// //slices
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const empSlice = createApi({
//   reducerPath: "empSlice",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8444",
//   }),
//   tagTypes: ["Employees"],
//   endpoints: (builder) => ({
//     getEmployees: builder.query({
//       query: () => "/getemp",
//       providesTags: ["Employees"],
//     }),
//     createEmployees: builder.mutation({
//       query: (empdata) => ({
//         url: "/createuser",
//         method: "POST",
//         body: "empdata",
//       }),
//       inValidatesTags: ["Employees"],
//     }),
//     updateEmployees: builder.mutation({
//       query: ({ id, ...updateddata }) => ({
//         url: `/editemp/${id}`,
//         method: "PUT",
//         body: "updateddata",
//       }),
//       inValidatesTags: ["Employees"],
//     }),
//     deleteEmployees: builder.mutation({
//       query: (id) => ({
//         url: `/deleteemp/${id}`,
//         method: "DELETE",
//       }),
//       inValidatesTags: ["Employees"],
//     }),
//   }),
// });
// export const {} = empSlice;
// export default empSlice;

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";
import { FaPenToSquare, FaTrash } from "fa/react";
import { useEmployeeSlice } from "../slices/empSlice";
import { useCreateEmployeeMutation } from "../../redux/slices/empSlice";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

const empData = {
  emp_id: "",
  name: "",
  post: "",
  salary: "",
};
const EmployeePage = () => {
  const [formData, setFormData] = useState(empData);
  const [showForm, setShowForm] = useState(null);
  const [editId, setEditId] = useState(false);

  //rtk
  const { data: response = {}, err } = useGetEmployeesQuery();
  const { createEmployee } = useCreateEmployeeMutation();
  const { updateEmployees } = useUpdateEmployeesMutation();
  const { deleteEmployee } = useDeleteEmployeeMutation();

  const employees = Array.isArray(response.data) ? response.data : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (editId) {
        await updateEmployees({ id: editId, ...formData });
        handleSuccess("Record updated succesfully!!");
      } else {
        await createEmployee(formData).unwrap();
        handleSuccess("Record added successfully!!");
      }

      setFormData(empData);
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      handleError("Error in submitting record!!");
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setFormData(emp);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee.unwrap(id);
      handleSuccess("Employee record deleted successfully!!");
    } catch (err) {
      handleError("Error in deleting record!!", err);
    }
  };

  return (
    <>
      <div>
        <div>
          {!showForm && (
            <button
              onClick={() => {
                setFormData(formData);
                setEditId(null);
                setShowForm(true);
              }}
            >
              Add
            </button>
          )}
          {showForm && (
            <form onSubmit={handleSubmit}>
              <h2>Employee Form</h2>
              <div className="emp_group">
                <label>Emp_ID:</label>
                <input
                  type="text"
                  name="emp_id"
                  value={formData.emp_id}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div className="emp_group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div className="emp_group">
                <label>Post:</label>
                <input
                  type="text"
                  name="post"
                  value={formData.post}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <div className="emp_group">
                <label>Salary:</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
              <br></br>
              <button
                onClick={() => {
                  editId ? "UPDATE" : "SUBMIT";
                }}
              >
                SUBMIT
              </button>
            </form>
          )}
          <table>
            <tr>
              <th>Emp_ID</th>
              <th>Name</th>
              <th>Post</th>
              <th>Salary</th>
            </tr>
            <tbody>
              {employees.map((index, emp) => (
                <tr key={index}>
                  <td>{emp.emp_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.post}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <FaPenToSquare onClick={() => handleEdit(emp)} />
                  </td>
                  <td>
                    <FaTrash onClick={() => handleDelete(emp._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default EmployeePage;

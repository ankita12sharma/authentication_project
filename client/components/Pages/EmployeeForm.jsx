// import React, { useState } from "react";
// import { handleSuccess, handleError } from "../../utils";
// import {
//   useCreateEmployeeMutation,
//   useGetEmployeesQuery,
//   useUpdateEmployeeMutation,
//   useDeleteEmployeeMutation,
// } from "../../redux/slices/empSlice";
// import { ToastContainer } from "react-toastify";
// import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";

// const empData = [
//   {
//     emp_id: "",
//     name: "",
//     post: "",
//     salary: "",
//   },
// ];

// const EmployeeForm = () => {
//   const [formData, setFormData] = useState(empData);
//   const [editId, setEditId] = useState(null);

//   //rtk query
//   const { data: response = {} } = useGetEmployeesQuery();
//   const [createEmployee] = useCreateEmployeeMutation();
//   const [updateEmployee] = useUpdateEmployeeMutation();
//   const [deleteEmployee] = useDeleteEmployeeMutation();

//   const employees = Array.isArray(response.data) ? response.data : [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { emp_id, name, post, salary } = formData;
//       if (!emp_id || !name || !post || !salary) {
//         return handleError("All fields are required!!");
//       }

//       if (editId) {
//         await updateEmployee({ id: editId, ...updateEmployee });
//         handleSuccess("Employee updated successfully!!");
//         setEditId(null);
//       } else {
//         await createEmployee(formData);
//         handleSuccess("Employee submiited successfully!!");
//       }
//       setFormData({
//         emp_id: "",
//         name: "",
//         post: "",
//         salary: "",
//       });
//     } catch (err) {
//       handleError(err?.data?.message || "Error in deleting employee!!");
//     }
//   };

//   const handleEdit = (emp) => {
//     try {
//       setEditId(emp._id);
//       setFormData({
//         emp_id: emp.emp_id,
//         name: emp.name,
//         post: emp.post,
//         salary: emp.salary,
//       });
//     } catch (err) {
//       handleError(err?.data?.message || "Error in updating employee!!");
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       await deleteEmployee(id);
//       handleSuccess("Employee deleted successfully!!");
//     } catch (err) {
//       handleError(err?.data?.message || "Error in deleting employee!!");
//     }
//   };
//   return (
//     <div className="empcontainer">
//       <div className="empheader">
//         <form onSubmit={handleSubmit} className="styled-emp">
//           <h2 className="empheading">Employee Form</h2>
//           <div className="emp-group">
//             <label>Employee Id:</label>
//             <input
//               name="emp_id"
//               type="text"
//               value={formData.emp_id}
//               onChange={handleChange}
//               placeholder="Enter id..."
//             ></input>
//           </div>
//           <br></br>
//           <div className="emp-group">
//             <label>Name:</label>
//             <input
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter name..."
//             ></input>
//           </div>
//           <br></br>
//           <div className="emp-group">
//             <label>Post:</label>
//             <select name="post" value={formData.post} onChange={handleChange}>
//               <option select="selected" value="selected">
//                 Select your post
//               </option>
//               <option value="Developer">Developer</option>
//               <option value="Engineer">Engineer</option>
//               <option value="Teacher">Teacher</option>
//               <option value="Clerk">Clerk</option>
//               <option value="Businessman">Businessman</option>
//               <option value="Designer">Designer</option>
//             </select>
//           </div>
//           <br></br>
//           <div className="emp-group">
//             <label>Salary:</label>
//             <input
//               name="salary"
//               type="text"
//               value={formData.salary}
//               onChange={handleChange}
//               placeholder="Enter salary..."
//             ></input>
//           </div>
//           <br></br>
//           <button type="submit" className="empbtn">
//             {editId ? "UPDATE" : "SUBMIT"}
//           </button>
//         </form>
//         <table className="emptable">
//           <tbody>
//             {employees.map((emp, index) => (
//               <tr key={index}>
//                 <td>{emp.emp_id}</td>
//                 <td>{emp.name}</td>
//                 <td>{emp.post}</td>
//                 <td>{emp.salary}</td>
//                 <td>
//                   <FaRegPenToSquare
//                     className="edit-icon"
//                     onClick={() => handleEdit(emp)}
//                   ></FaRegPenToSquare>
//                 </td>
//                 <td>
//                   <FaTrash
//                     className="del-icon"
//                     onClick={() => handleDelete(emp._id)}
//                   ></FaTrash>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };
// export default EmployeeForm;

import React, { useState } from "react";
import { FaPenToSquare, FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../redux/slices/empSlice";

const empData = {
  emp_id: "",
  name: "",
  post: "",
  salary: "",
};
const EmployeeForm = () => {
  const [formData, setFormData] = useState(empData);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //rtk
  const { data: response = {}, error } = useGetEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const employees = Array.isArray(response.data) ? response.data : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setFormData(emp);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateEmployee({ id: editId, ...formData });
        handleSuccess("Data updated successfully!!");
      } else {
        await createEmployee(formData).unwrap();
        handleSuccess("Record created successfully!!!");
      }
      setEditId(null);
      setFormData(empData);
      setShowForm(false);
    } catch (err) {
      handleError("Error in submitting record!!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id).unwrap();
      handleSuccess("Record deleted successfully!!");
    } catch (err) {
      handleError("Error in deleting record!!");
    }
  };
  return (
    <div classsName="empcontainer">
      <div className="empheader">
        {!showForm && (
          <button
            className="add_empbtn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            ADD +
          </button>
        )}
        {showForm && (
          <form className="styled-emp" onSubmit={handleSubmit}>
            <h2 className="empheading">EMPLOYEE FORM</h2>
            <div className="emp-group">
              <label>Emp Id:</label>
              <input
                type="text"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleChange}
                placeholder="Enter your id..."
              ></input>
            </div>
            <br></br>
            <div className="emp-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
              ></input>
            </div>
            <br></br>
            <div className="emp_group">
              <label>Post:</label>
              <select name="post" value={formData.post} onChange={handleChange}>
                <option value="">Please select your post</option>
                <option value="Engineer">Engineer</option>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Businessman">Businessman</option>
              </select>
            </div>
            <br></br>
            <div className="emp-group">
              <label>Salary:</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter your salary..."
              ></input>
            </div>
            <br></br>
            <button className="empbtn">{editId ? "UPDATE" : "SUBMIT"}</button>
          </form>
        )}
        <table className="emptable">
          <thead>
            <tr>
              <th>Emp Id</th>
              <th>Name</th>
              <th>Post</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.post}</td>
                <td>{emp.salary}</td>
                <td>
                  <FaPenToSquare
                    className="edit-icon"
                    onClick={() => handleEdit(emp)}
                  ></FaPenToSquare>
                </td>
                <td>
                  <FaTrash
                    className="del-icon"
                    onClick={() => handleDelete(emp._id)}
                  ></FaTrash>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};
export default EmployeeForm;

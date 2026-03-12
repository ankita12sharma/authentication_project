// import React, { useState } from "react";
// import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
// import { ToastContainer } from "react-toastify";
// import { handleSuccess, handleError } from "../../utils";
// import {
//   useGetUsersQuery,
//   useCreateUserMutation,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
// } from "../../redux/slices/registerSlice";

// const usersData = [
//   {
//     full_name: "",
//     email_address: "",
//     password: "",
//     phone_no: "",
//     shipping_address: "",
//   },
// ];

// const RegisterPage = () => {
//   const [formData, setFormData] = useState(usersData);
//   const [editId, setEditId] = useState(null);

//   //rtk
//   const { data: response = {}, error } = useGetUsersQuery();
//   const [createUser] = useCreateUserMutation();
//   const [updateUser] = useUpdateUserMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   const reg_users = Array.isArray(response.data) ? response.data : [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (user) => {
//     setEditId(user._id);
//     setFormData({
//       full_name: user.full_name,
//       email_address: user.email_address,
//       password: user.password,
//       phone_no: user.phone_no,
//       shipping_address: user.shipping_address,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const { full_name, email_address, password, phone_no, shipping_address } =
//       //   formData;
//       // if (
//       //   !full_name ||
//       //   !email_address ||
//       //   !password ||
//       //   !phone_no ||
//       //   shipping_address
//       // ) {
//       //   handleError("All fields are required!!");
//       // }
//       if (editId) {
//         await updateUser({ id: editId, ...formData }).unwrap();
//         handleSuccess("Data updated successfully!!");
//         setEditId(null);
//       } else {
//         //create
//         await createUser(formData).unwrap();
//         handleSuccess("Data created successfully!!");
//       }
//       setFormData({
//         full_name: "",
//         email_address: "",
//         password: "",
//         phone_no: "",
//         shipping_address: "",
//       });
//     } catch (err) {
//       handleError("Error in submitting data!!", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id).unwrap();
//       handleSuccess("Data deleted successfully!!");
//     } catch (err) {
//       handleError("Error in deleting data!!", err);
//     }
//   };

//   return (
//     <div className="productcontainer">
//       <div className="productheader">
//         <form onSubmit={handleSubmit} className="styled-form">
//           <h2 className="heading">Registeration Form</h2>
//           <div className="product-group">
//             <label>Full Name:</label>
//             <input
//               type="text"
//               name="full_name"
//               value={formData.full_name}
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Email Address:</label>
//             <input
//               type="text"
//               name="email_address"
//               value={formData.email_address}
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Password:</label>
//             <input
//               type="text"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Phone No:</label>
//             <input
//               type="text"
//               name="phone_no"
//               value={formData.phone_no}
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Shipping Address:</label>
//             <input
//               type="text"
//               name="shipping_address"
//               value={formData.shipping_address}
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <button type="submit" className="btn">
//             {editId ? "UPDATE" : "SUBMIT"}
//           </button>
//         </form>
//         <table className="product_table">
//           <tbody>
//             {reg_users.map((user, index) => (
//               <tr key={index}>
//                 <td>{user.full_name}</td>
//                 <td>{user.email_address}</td>
//                 <td>{user.password}</td>
//                 <td>{user.phone_no}</td>
//                 <td>{user.shipping_address}</td>
//                 <td>
//                   <FaRegPenToSquare
//                     className="edit_btn"
//                     onClick={() => handleEdit(user)}
//                   ></FaRegPenToSquare>
//                 </td>
//                 <td>
//                   <FaTrash
//                     className="del_btn"
//                     onClick={() => handleDelete(user._id)}
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
// export default RegisterPage;

import React, { useState } from "react";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/slices/registerSlice";

const initialForm = {
  full_name: "",
  email_address: "",
  password: "",
  phone_no: "",
  shipping_address: "",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // RTK Query
  const { data: response = {} } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const reg_users = Array.isArray(response.data) ? response.data : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setFormData(user);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateUser({ id: editId, ...formData }).unwrap();
        handleSuccess("Data updated successfully!");
      } else {
        await createUser(formData).unwrap();
        handleSuccess("Data created successfully!");
      }

      setFormData(initialForm);
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      handleError("Error in submitting data!", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      handleSuccess("Data deleted successfully!");
    } catch (err) {
      handleError("Error in deleting data!", err);
    }
  };

  return (
    <div className="productcontainer">
      <div className="productheader">
        {/* ADD USER BUTTON */}
        {!showForm && (
          <button
            className="add_btn"
            onClick={() => {
              setFormData(initialForm);
              setEditId(null);
              setShowForm(true);
            }}
          >
            + Add User
          </button>
        )}

        {/* FORM */}
        {showForm && (
          <form onSubmit={handleSubmit} className="styled-form">
            <h2 className="heading">
              {/* {editId ? "Update User" : "Register User"} */}
            </h2>

            <div className="product-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="product-group">
              <label>Email Address:</label>
              <input
                type="text"
                name="email_address"
                value={formData.email_address}
                onChange={handleChange}
              />
            </div>

            <div className="product-group">
              <label>Password:</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="product-group">
              <label>Phone No:</label>
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>

            <div className="product-group">
              <label>Shipping Address:</label>
              <input
                type="text"
                name="shipping_address"
                value={formData.shipping_address}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn">
              {editId ? "UPDATE" : "SUBMIT"}
            </button>
          </form>
        )}

        <table className="product_table">
          <tbody>
            <td>Name</td>
            <td>Email</td>
            <td>Password</td>
            <td>Phone No</td>
            <td>Address</td>
            <td>Actions</td>
            {reg_users.map((user) => (
              <tr key={user._id}>
                <td>{user.full_name}</td>
                <td>{user.email_address}</td>
                <td>{user.password}</td>
                <td>{user.phone_no}</td>
                <td>{user.shipping_address}</td>
                <td>
                  <FaRegPenToSquare
                    className="edit_btn"
                    onClick={() => handleEdit(user)}
                  />
                </td>
                <td>
                  <FaTrash
                    className="del_btn"
                    onClick={() => handleDelete(user._id)}
                  />
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

export default RegisterPage;

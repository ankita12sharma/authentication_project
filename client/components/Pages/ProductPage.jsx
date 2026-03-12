// // import React, { useState } from "react";
// // import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
// // import { ToastContainer } from "react-toastify";
// // import { handleSuccess, handleError } from "../../utils";
// // import {
// //   useGetProductsQuery,
// //   useCreateProductMutation,
// //   useUpdateProductMutation,
// //   useDeleteProductMutation,
// // } from "../../redux/slices/productSlice";

// // const productData = [
// //   {
// //     name: "",
// //     quantity: "",
// //     price: "",
// //   },
// // ];

// const ProductPage = () => {
//   const [formData, setFormData] = useState(productData);
//   const [editId, setEditId] = useState(null);

//   //rtk
//   const { data: response = {}, error } = useGetProductsQuery();
//   const [createProduct] = useCreateProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   const products = Array.isArray(response.data) ? response.data : [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   const handleEdit = (product) => {
//     setEditId(product._id),
//       setFormData({
//         name: product.name,
//         quantity: product.quantity,
//         price: product.price,
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { name, quantity, price } = formData;
//       if (!name || !quantity || !price) {
//         handleError("Name, Quantity and Price are required");
//       }
//       //update product
//       if (editId) {
//         await updateProduct({ id: editId, ...formData }).unwrap();
//         handleSuccess("Product updated successfully!!");
//         setEditId(null);
//       } else {
//         //create product
//         await createProduct(formData).unwrap();
//         handleSuccess("Product created successfully!!");
//       }
//       setFormData({
//         name: "",
//         quantity: "",
//         price: "",
//       });
//     } catch (err) {
//       handleError(err?.data?.message || "Error in submitting data");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       handleSuccess("Product deleted successfully!!");
//     } catch (err) {
//       handleError(err?.data?.message || "Error in deleting data");
//     }
//   };

//   return (
//     <div className="productcontainer">
//       <div className="productheader">
//         <form onSubmit={handleSubmit} className="styled-product">
//           <h2 className="productheading">Product Form</h2>
//           <div className="product-group">
//             <label>Name:</label>
//             <input
//               name="name"
//               type="text"
//               value={formData.name}
//               placeholder="Enter name..."
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Quantity:</label>
//             <input
//               name="quantity"
//               type="text"
//               value={formData.quantity}
//               placeholder="Enter quantity..."
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <div className="product-group">
//             <label>Price:</label>
//             <input
//               name="price"
//               type="text"
//               value={formData.price}
//               placeholder="Enter price..."
//               onChange={handleChange}
//             ></input>
//           </div>
//           <br></br>
//           <button type="submit" className="productbtn">
//             {editId ? "UPDATE" : "SUBMIT"}
//           </button>
//         </form>
//         <table className="product-table">
//           <tbody>
//             {products.map((product, index) => (
//               <tr key={index}>
//                 <td>{product.name}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <FaRegPenToSquare
//                     className="edit-icon"
//                     onClick={() => handleEdit(product)}
//                   ></FaRegPenToSquare>
//                 </td>
//                 <td>
//                   <FaTrash
//                     className="del-icon"
//                     onClick={() => handleDelete(product._id)}
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
// export default ProductPage;

// import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";
// import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
// import { handleSuccess, handleError } from "../../utils";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "../../redux/slices/productSlice";

// const productData = {
//   name: "",
//   quantity: "",
//   price: "",
// };
// const ProductPage = () => {
//   const [formData, setFormData] = useState(productData);
//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   //rtk
//   const { data: response = {}, error } = useGetProductsQuery();
//   const [createProduct] = useCreateProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   const proinfo = Array.isArray(response.data) ? response.data : [];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...formData,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (product) => {
//     setFormData(product);
//     setEditId(product._id);
//     setShowForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updateProduct({ id: editId, ...formData }).unwrap();
//         handleSuccess("Record updated successfully!!");
//       } else {
//         await createProduct(formData).unwrap();
//         handleSuccess("Product created successfully!!");
//       }
//       setFormData(productData);
//       setEditId(null);
//       setShowForm(false);
//     } catch (err) {
//       handleError("Error in submitting data", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       handleSuccess("Product deleted successfully!!");
//     } catch (err) {
//       handleError("Error in deleting data", err);
//     }
//   };

//   return (
//     <div className="productcontainer">
//       <div className="productheader">
//         {!showForm && (
//           <button
//             className="add_btn"
//             onClick={() => {
//               (setFormData(productData), setEditId(null), setShowForm(true));
//             }}
//           >
//             {" "}
//             Add Product{" "}
//           </button>
//         )}
//         {showForm && (
//           <form onSubmit={handleSubmit} className="styled-form">
//             <h2 className="product-heading">PRODUCT FORM</h2>
//             <div className="product-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter name"
//               ></input>
//             </div>
//             <br></br>
//             <div className="product-group">
//               <label>Quantity:</label>
//               <input
//                 name="quantity"
//                 type="text"
//                 value={formData.quantity}
//                 onChange={handleChange}
//               ></input>
//             </div>
//             <br></br>
//             <div className="product-group">
//               <label>Price:</label>
//               <input
//                 name="price"
//                 type="text"
//                 value={formData.price}
//                 onChange={handleChange}
//               ></input>
//             </div>
//             <br></br>
//             <button
//               className="productbtn"
//               onClick={() => {
//                 editId ? "UPDATE" : "SUBMIT";
//               }}
//             />
//           </form>
//         )}
//         <table className="product-table">
//           <th>Name</th>
//           <th>Quantity</th>
//           <th>Price</th>
//           {proinfo.map((product, index) => (
//             <tr key={index}>
//               <td>{product.name}</td>
//               <td>{product.quantity}</td>
//               <td>{product.price}</td>
//               <td>
//                 <FaRegPenToSquare
//                   className="edit-icon"
//                   onClick={() => handleEdit(product)}
//                 >
//                   UPDATE
//                 </FaRegPenToSquare>
//               </td>
//               <td>
//                 <FaTrash
//                   className="del-icon"
//                   onClick={() => handleDelete(emp._id)}
//                 ></FaTrash>
//               </td>
//             </tr>
//           ))}
//         </table>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };
// export default ProductPage;

// //DEBOUNCING CONCEPT
// import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
// import { handleSuccess, handleError } from "../../utils";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "../../redux/slices/productSlice";

// const productData = {
//   name: "",
//   quantity: "",
//   price: "",
// };

// const ProductPage = () => {
//   const [formData, setFormData] = useState(productData);
//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // RTK Query: fetch all products
//   const { data: response = {}, error } = useGetProductsQuery();
//   const [createProduct] = useCreateProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   // ✅ Debounce logic
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // Listen to Header input
//   useEffect(() => {
//     const headerInput = document.querySelector(".header input");

//     const handleInput = (e) => setSearch(e.target.value);

//     if (headerInput) {
//       headerInput.addEventListener("input", handleInput);
//     }

//     return () => {
//       if (headerInput) {
//         headerInput.removeEventListener("input", handleInput);
//       }
//     };
//   }, []);

//   // Apply 500ms debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search.trim());
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // Get product list
//   const allProducts = Array.isArray(response.data) ? response.data : [];

//   // Filter products only if search exists
//   const proinfo =
//     debouncedSearch.length > 0
//       ? allProducts.filter((p) =>
//           p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
//         )
//       : allProducts;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (product) => {
//     setFormData(product);
//     setEditId(product._id);
//     setShowForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updateProduct({ id: editId, ...formData }).unwrap();
//         handleSuccess("Record updated successfully!!");
//       } else {
//         await createProduct(formData).unwrap();
//         handleSuccess("Product created successfully!!");
//       }
//       setFormData(productData);
//       setEditId(null);
//       setShowForm(false);
//     } catch (err) {
//       handleError("Error in submitting data", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       handleSuccess("Product deleted successfully!!");
//     } catch (err) {
//       handleError("Error in deleting data", err);
//     }
//   };

//   return (
//     <div className="productcontainer">
//       <div className="productheader">
//         {!showForm && (
//           <button
//             className="add_btn"
//             onClick={() => {
//               setFormData(productData);
//               setEditId(null);
//               setShowForm(true);
//             }}
//           >
//             Add Product
//           </button>
//         )}
//         {showForm && (
//           <form onSubmit={handleSubmit} className="styled-form">
//             <h2 className="product-heading">PRODUCT FORM</h2>
//             <div className="product-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter name"
//               />
//             </div>
//             <br />
//             <div className="product-group">
//               <label>Quantity:</label>
//               <input
//                 name="quantity"
//                 type="text"
//                 value={formData.quantity}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <div className="product-group">
//               <label>Price:</label>
//               <input
//                 name="price"
//                 type="text"
//                 value={formData.price}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <button className="productbtn" type="submit">
//               {editId ? "UPDATE" : "SUBMIT"}
//             </button>
//           </form>
//         )}
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proinfo.map((product) => (
//               <tr key={product._id}>
//                 <td>{product.name}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <FaRegPenToSquare
//                     className="edit-icon"
//                     onClick={() => handleEdit(product)}
//                   />
//                 </td>
//                 <td>
//                   <FaTrash
//                     className="del-icon"
//                     onClick={() => handleDelete(product._id)}
//                   />
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

// export default ProductPage;

//DEBOUNCING CONCEPT
// import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
// import { handleSuccess, handleError } from "../../utils";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "../../redux/slices/productSlice";

// const productData = {
//   name: "",
//   quantity: "",
//   price: "",
// };

// const ProductPage = () => {
//   const [formData, setFormData] = useState(productData);
//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // RTK Query: fetch all products
//   const { data: response = {}, error } = useGetProductsQuery();
//   const [createProduct] = useCreateProductMutation();
//   const [updateProduct] = useUpdateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();

//   // ✅ Debounce logic
//   const [search, setSearch] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // Listen to Header input
//   useEffect(() => {
//     const headerInput = document.querySelector(".header input");

//     const handleInput = (e) => setSearch(e.target.value);

//     if (headerInput) {
//       headerInput.addEventListener("input", handleInput);
//     }

//     return () => {
//       if (headerInput) {
//         headerInput.removeEventListener("input", handleInput);
//       }
//     };
//   }, []);

//   // Apply 500ms debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(search.trim());
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   // Get product list
//   const allProducts = Array.isArray(response.data) ? response.data : [];

//   // Filter products only if search exists
//   const proinfo =
//     debouncedSearch.length > 0
//       ? allProducts.filter((p) =>
//           p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
//         )
//       : allProducts;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (product) => {
//     setFormData(product);
//     setEditId(product._id);
//     setShowForm(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await updateProduct({ id: editId, ...formData }).unwrap();
//         handleSuccess("Record updated successfully!!");
//       } else {
//         await createProduct(formData).unwrap();
//         handleSuccess("Product created successfully!!");
//       }
//       setFormData(productData);
//       setEditId(null);
//       setShowForm(false);
//     } catch (err) {
//       handleError("Error in submitting data", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       handleSuccess("Product deleted successfully!!");
//     } catch (err) {
//       handleError("Error in deleting data", err);
//     }
//   };

//   return (
//     <div className="productcontainer">
//       <div className="productheader">
//         {!showForm && (
//           <button
//             className="add_btn"
//             onClick={() => {
//               setFormData(productData);
//               setEditId(null);
//               setShowForm(true);
//             }}
//           >
//             Add Product
//           </button>
//         )}
//         {showForm && (
//           <form onSubmit={handleSubmit} className="styled-form">
//             <h2 className="product-heading">PRODUCT FORM</h2>
//             <div className="product-group">
//               <label>Name:</label>
//               <input
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter name"
//               />
//             </div>
//             <br />
//             <div className="product-group">
//               <label>Quantity:</label>
//               <input
//                 name="quantity"
//                 type="text"
//                 value={formData.quantity}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <div className="product-group">
//               <label>Price:</label>
//               <input
//                 name="price"
//                 type="text"
//                 value={formData.price}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <button className="productbtn" type="submit">
//               {editId ? "UPDATE" : "SUBMIT"}
//             </button>
//           </form>
//         )}
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {proinfo.map((product) => (
//               <tr key={product._id}>
//                 <td>{product.name}</td>
//                 <td>{product.quantity}</td>
//                 <td>{product.price}</td>
//                 <td>
//                   <FaRegPenToSquare
//                     className="edit-icon"
//                     onClick={() => handleEdit(product)}
//                   />
//                 </td>
//                 <td>
//                   <FaTrash
//                     className="del-icon"
//                     onClick={() => handleDelete(product._id)}
//                   />
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

// export default ProductPage;

import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { handleSuccess, handleError } from "../../utils";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../redux/slices/productSlice";

const productData = { name: "", quantity: "", price: "" };

const ProductPage = () => {
  const [formData, setFormData] = useState(productData);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: response = {} } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  //const [search, setSearch] = useState("");
  //const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const allProducts = Array.isArray(response.data) ? response.data : [];
  const proinfo =
    debouncedSearch.length > 0
      ? allProducts.filter((p) =>
          p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
      : allProducts;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProduct({ id: editId, ...formData }).unwrap();
        handleSuccess("Record updated successfully!");
      } else {
        await createProduct(formData).unwrap();
        handleSuccess("Product created successfully!");
      }
      setFormData(productData);
      setEditId(null);
      setShowForm(false);
    } catch (err) {
      handleError("Error in submitting data", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      handleSuccess("Product deleted successfully!");
    } catch (err) {
      handleError("Error in deleting data", err);
    }
  };

  return (
    <div className="product-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={`form-modal ${showForm ? "active" : ""}`}>
        {showForm && (
          <div className="form-wrapper">
            <h2>{editId ? "UPDATE PRODUCT" : "ADD PRODUCT"}</h2>
            <form onSubmit={handleSubmit} className="styled-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Quantity:</label>
                <input
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="submit-btn" type="submit">
                {editId ? "UPDATE" : "SUBMIT"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                CANCEL
              </button>
            </form>
          </div>
        )}
      </div>

      {!showForm && (
        <button
          className="add-btn"
          onClick={() => {
            setFormData(productData);
            setEditId(null);
            setShowForm(true);
          }}
        >
          Add Product
        </button>
      )}

      <div className="table-section">
        {proinfo.length === 0 ? (
          <p className="no-data">No products found.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {proinfo.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>
                    <FaRegPenToSquare
                      className="edit-icon"
                      onClick={() => handleEdit(product)}
                    />
                  </td>
                  <td>
                    <FaTrash
                      className="del-icon"
                      onClick={() => handleDelete(product._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductPage;

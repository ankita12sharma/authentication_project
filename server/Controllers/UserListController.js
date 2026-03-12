// //pagination concept
// import React, { useState } from "react";
// const ProductModel = require("../Models/ProductModel");

// const getProductsByRange = async (req, res) => {
//   try {
//     const start = Number(req.query.start);
//     const end = Number(req.query.end);

//     const skip = start - 1;
//     const limit = end - start + 1;

//     const [products, totalRecords] = await Promise.all([
//       ProductModel.find().skip(skip).limit(limit),
//       ProductModel.countDocuments(),
//     ]);

//     res.status(200).json({
//       responseCode: "200",
//       responseMessage: "Records fetched successfully!!",
//       meta: {
//         start,
//         end,
//         returnRecord: products.length,
//         totalRecords,
//       },
//       data: products,
//     });
//   } catch (err) {
//     res.status(500).json({
//       responseCode: "500",
//       responseMessage: "Unable to fetch data!!",
//     });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { name, quantity, price } = req.body;
//     const pro_data = await ProductModel.findOne({ name });
//     if (pro_data) {
//       return res.status(403).json({
//         code: "403",
//         msg: "data already exist",
//       });
//     }
//     const promodel = new ProductModel({ name, quantity, price });
//     await promodel.save();

//     res.status(201).json({
//       code: "200",
//       msg: "Data created !!",
//       promodel,
//     });
//   } catch (err) {}
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { name, quantity, price } = req.body;
//     const { id } = req.params;
//     const update_rec = {};
//     if (name) update_rec.name = name;
//     if (quantity) update_rec.quantity = quantity;
//     if (price) update_rec.price = price;

//     const updatedRec = await ProductModel.findByIdAndUpdate(id, update_rec, {
//       name: true,
//       runValidators: true,
//     });
//     if (!updatedRec) {
//       return res.status(404).json({
//         msg: "Record not found!!",
//       });
//     }
//     res.status(200).json({
//       msg: "record updated !!",
//       data: updatedRec,
//     });
//   } catch (err) {
//     res.status(500).json({
//       code: "500",
//       msg: "Unable to create data!!",
//     });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const pro_data = await ProductModel.findByIdAndDelete(id);
//     if (!pro_data) {
//       return res.status(404).json({
//         msg: "data not found",
//       });
//     }
//     res.status(200).json({
//       code: "200",
//       msg: "record deleted!!",
//     });
//   } catch (err) {
//     res.status(500).json({
//       code: "500",
//       msg: "Unable to delete data!!",
//     });
//   }
// };

// module.exports = { getProductsByRange };

//productpage.jsx

import React, { useState } from "raect";
import { ToastContainer } from "react-toastify";
import { FaPenToSquare, FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { handleSuccess, handleError } from "../../client/utils";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../client/redux/slices/productSlice";

const productData = {
  name: "",
  quantity: "",
  price: "",
};

const ProdudctPage = () => {
  const [formData, setFormData] = useState(0);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  //rtk query
  const { data: response = {}, error } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const fetch = Array.isArray(response.data) ? response.data : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleEdit = (product) => {
    setFormData(product);
    setShowForm(true);
    setEditId(product._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProduct({ id: editId, ...formData });
        handleSuccess("Record updated successfully!!");
      } else {
        await createProduct(formData).unwrap();
        handleSuccess("Record created successfully!!");
      }
      setFormData(productData);
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      handleError("Error in submitting record!!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      handleSuccess("Product deleted successfully!!");
    } catch (err) {
      handleError("Error in deleting record!!");
    }
  };
  return (
    <div>
      <div>
        {!showForm && (
          <button
            onClick={() => {
              (setFormData(productData), setShowForm(true), setEditId(null));
            }}
          >
            ADD PRODUCT
          </button>
        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <h2>PRODUCT FORM</h2>
            <div className="pro-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <br></br>
            <div className="pro-group">
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <br></br>
            <div className="pro-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
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
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          {fetch.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.quantity}</td>
              <td>{data.price}</td>
              <td>
                <FaRegPenToSquare onClick={() => handleEdit(data)} />
              </td>
              <td>
                <FaTrash onClick={() => handleDelete(data._id)} />
              </td>
            </tr>
          ))}
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

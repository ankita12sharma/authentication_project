import React, { useState } from "react";
import { handleSuccess, handleError } from "../../utils";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import {
  useCreatePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../redux/slices/postSlice";

const postData = [
  {
    name: "",
    title: "",
    body: "",
  },
];

const PostPage = () => {
  const [formData, setFormData] = useState(postData);
  const [editId, setEditId] = useState(null);

  //rtk query
  const { data: response = {}, error } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const posts = Array.isArray(response.data) ? response.data : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (post) => {
    setEditId(post._id),
      setFormData({
        name: post.name,
        title: post.title,
        body: post.body,
      });
  };
  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      handleSuccess("Post deleted successfully!!");
    } catch (err) {
      handleError(err?.data?.message || "Error in deleting data!!");
    }
  };

  const handleSubmit = async (e) => {
    try {
      const { name, title, body } = formData;
      if (!name || !title || !body) {
        handleError("Name,title,body are required...");
      }
      if (editId) {
        //update data
        await updatePost({ id: editId, ...formData });
        handleSuccess("Data updated successfully!!");
        setEditId(null);
      } else {
        //create data
        await createPost(formData);
        handleSuccess("Data created successfully!!");
      }
      //clearing data
      setFormData({
        name: "",
        title: "",
        body: "",
      });
    } catch (err) {
      handleError(err?.data?.message || "Error in submitting data!!");
    }
  };
  return (
    <div className="postcontainer">
      <div className="postheader">
        <form classname="styled-post" onSubmit={handleSubmit}>
          <h2 className="post-heading">Post Form</h2>
          <div className="post-group">
            <label>Name:</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              placeholder="Enter name..."
              onChange={handleChange}
            ></input>
          </div>
          <br></br>
          <div className="post-group">
            <label>Title:</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              placeholder="Enter title..."
              onChange={handleChange}
            ></input>
          </div>
          <br></br>
          <div className="post-group">
            <label>Body:</label>
            <input
              name="body"
              type="text"
              value={formData.body}
              placeholder="Enter body..."
              onChange={handleChange}
            ></input>
          </div>
          <br></br>
          <button type="submit" className="postbtn">
            {editId ? "UPDATE" : "SUBMIT"}
          </button>
          <br></br>
        </form>
        <table className="post-table">
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{post.name}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <FaRegPenToSquare
                    className="edit-icon"
                    onClick={() => handleEdit(post)}
                  />
                  <FaTrash
                    className="del-icon"
                    onClick={() => handleDelete(post._id)}
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
export default PostPage;

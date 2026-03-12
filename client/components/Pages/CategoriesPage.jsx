// Export hooks for usage in functional components
/*import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/slices/categorySlice";
import React, { useState } from "react";


const categoryData = [
  {
    name: "",
    title: "",
    imageurl: "",
    content: "",
    children: "",
  },
];
// Category component
const CategoryPage = () => {
  const [formData, setFormData] = useState(categoryData);
  const [editId, setEditId] = useState(null);

  //rtk query
  const { data: response = {}, error } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = Array.isArray(response.data) ? response.data : [];

  const handleEdit = (category) => {
    setEditId(category._id),
      setFormData({
        name: category.name,
        title: category.title,
        imageurl: category.imageurl,
        content: category.content,
        children: category.children,
      });
  };
  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
    } catch (err) {
      console.log("Error in deleting data!!");
    }
  };

  const handleSubmit = async (e) => {
    try {
      
      if (editId) {
        //update data
        await updateCategory({ id: editId, ...formData });
        setEditId(null);
      } else {
        //create data
        await createPost(formData);
      }
      //clearing data
      setFormData({
        name: "",
        title: "",
        imageurl: "",
        content: "",
        children: "",
      });
    } catch (err) {
      console.log("Error in submitting data!!");
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <button onClick={handleSubmit}>Create Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h2>{category.title}</h2>
            <img src={category.imageurl} alt={category.title} width={100} />
            <p>{category.content}</p>
            <button onClick={() => handleEdit(category.id)}>Update</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;*/

// Import necessary hooks and libraries
/*import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/slices/categorySlice";

const CategoryDropdown = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Fetch categories from the API
  const { data: response = {}, isLoading, error } = useGetCategoriesQuery();
  const categories = Array.isArray(response.data) ? response.data : [];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const renderChildren = (children) => {
    if (!children || children.length === 0) return null;

    return (
      <ul className="submenu">
        {children.map((child, index) => (
          <li key={index}>
            <h4>{child.name}</h4>
            <p>{child.title}</p>
            <img src={child.imageurl} alt={child.name} width={50} />
            <p>{child.content}</p>
            {renderChildren(child.children)}
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories!</div>;

  return (
    <div>
      <button onClick={toggleDropdown}>Categories</button>
      {isDropdownVisible && (
        <ul className="dropdown">
          {categories.map((category) => (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <p>{category.title}</p>
              <img src={category.imageurl} alt={category.name} width={100} />
              <p>{category.content}</p>
              {renderChildren(category.children)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;*/

/*import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/slices/categorySlice"; // Path to your RTK Query hook

const CategoriesPage = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown} className="dropdown-button">
        Categories
      </button>

      {isDropdownVisible && (
        <div className="dropdown-menu">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching categories: {error.message}</p>}
          {categories && categories.length > 0 ? (
            <ul>
              {categories.map((category) => (
                <li key={category.title}>
                  {category.title}
                  {}
                  {category.children && category.children.length > 0 && (
                    <ul className="submenu">
                      {category.children.map((child) => (
                        <li key={child.title}>{child.title}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;*/

import React, { useState } from "react";
import { useGetCategoriesQuery } from "../../redux/slices/categorySlice"; // Adjust the path
import { Link } from "react-router-dom";
import { BiSolidCategoryAlt } from "react-icons/bi";
// import "./Dropdown.css"; // Optional CSS for styling

const CategoriesPage = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent default Link behavior
    setDropdownVisible((prev) => !prev);
  };

  const renderCategories = (children) => {
    return (
      <ul className="menu">
        {children.map((category) => (
          <li key={category.name} className="menu-item">
            <div>{category.title}</div>
            {category.children && category.children.length > 0 && (
              <ul className="submenu">{renderCategories(category.children)}</ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mylist-two">
      {/* Categories link */}
      <Link to="#" onClick={toggleDropdown}>
        <BiSolidCategoryAlt />
        Categories
      </Link>

      {/* Dropdown */}
      {isDropdownVisible && (
        <div className="dropdown-container">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {categories ? (
            // Only render submenus (children) of the categories
            categories.children && categories.children.length > 0 ? (
              renderCategories(categories.children)
            ) : (
              <p>No subcategories available.</p>
            )
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;

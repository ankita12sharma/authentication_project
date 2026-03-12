const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../Controllers/CategoriesController");
const route = new express.Router();

route.post("/createcategory", createCategory);
route.get("/getcategories", getCategories);
route.put(`/editcategory/:id`, updateCategory);
route.delete(`deletecategory/:id`, deleteCategory);

module.exports = route;

const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../Controllers/PostController");
const route = new express.Router();

route.post("/createpost", createPost);
route.get("/getposts", getPosts);
route.put(`/editpost/:id`, updatePost);
route.delete(`/deletepost/:id`, deletePost);

module.exports = route;

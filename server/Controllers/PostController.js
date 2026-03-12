const PostModel = require("../Models/PostModel");

//create
const createPost = async (req, res) => {
  try {
    const { name, title, body } = req.body;
    const post = await PostModel.findOne({ title });
    if (post) {
      return res.status(409).json({
        message: "Post already created",
        success: false,
      });
    }
    const postmodel = new PostModel({ name, title, body });
    await postmodel.save();
    res.status(201).json({
      message: "Post created suceesfully...",
      success: true,
      postmodel,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      succsess: false,
    });
  }
};

//get
const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      succsess: false,
    });
  }
};

//update
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, body } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (title) updateData.title = title;
    if (body) updateData.body = body;

    const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//delete
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Post deleted successfully...",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };

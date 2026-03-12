const CategoryModel = require("../Models/CategoriesModel");

//create
const createCategory = async (req, res) => {
  try {
    const { name, title, imageurl, content, children } = req.body;
    /*const category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(409).json({
        message: "Category already created",
        success: false,
      });
    }*/
    const categorymodel = new CategoryModel({
      name,
      title,
      imageurl,
      content,
      children,
    });
    await categorymodel.save();
    res.status(201).json({
      message: "Post created suceesfully...",
      success: true,
      categorymodel,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//update

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, imageurl, content, children } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (title) updateData.title = title;
    if (imageurl) updateData.imageurl = imageurl;
    if (content) updateData.content = content;
    if (children) updateData.children = children;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Category updated successfully...",
      success: true,
      data: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//delete
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
        status: false,
      });
    }
    res.status(200).json({
      message: "Category deleted successfully...",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};

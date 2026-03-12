const registerModel = require("../Models/RegisterModel");

const getregisterUsers = async (req, res) => {
  try {
    const reg_users = await registerModel.find({});

    res.status(200).json({
      responseStatus: "200",
      responseMessage: "Users fetched successfully!!",
      data: reg_users,
    });
  } catch (err) {
    res.status(500).json({
      responseStatus: "500",
      responseMessage: "Error in fetching data",
    });
  }
};

const createregisterUsers = async (req, res) => {
  try {
    const { full_name, email_address, password, phone_no, shipping_address } =
      req.body;
    const existing_users = await registerModel.findOne({ email_address });
    if (existing_users) {
      return res.status(403).json({
        responseMessage: "User already exist!!",
      });
    }

    const reg_users = new registerModel({
      full_name,
      email_address,
      password,
      phone_no,
      shipping_address,
    });
    await reg_users.save();
    res.status(201).json({
      responseCode: "200",
      responseMessage: "User registered successfully!!",
      reg_users,
    });
  } catch (err) {
    res.status(500).json({
      responseStatus: "500",
      responseMessage: "Error in creating data",
    });
  }
};

const updateregisterUsers = async (req, res) => {
  try {
    const { full_name, email_address, password, phone_no, shipping_address } =
      req.body;
    const { id } = req.params;
    const updateUser = {};
    // if (id) updateUser.id = id;
    if (full_name) updateUser.full_name = full_name;
    if (email_address) updateUser.email_address = email_address;
    if (password) updateUser.password = password;
    if (phone_no) updateUser.phone_no = phone_no;
    if (shipping_address) updateUser.shipping_address = shipping_address;

    const updatedUser = await registerModel.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "User does not exist",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "User updated successsfully!!",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      responseStatus: "500",
      responseMessage: "Error in deleting data",
    });
  }
};

const deleteregisterUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUsers = await registerModel.findByIdAndDelete(id);
    if (!existingUsers) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "User not found!!",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "User deleted successsfully!!",
    });
  } catch (err) {
    res.status(500).json({
      responseStatus: "500",
      responseMessage: "Error in deleting data",
    });
  }
};
module.exports = {
  getregisterUsers,
  createregisterUsers,
  updateregisterUsers,
  deleteregisterUsers,
};

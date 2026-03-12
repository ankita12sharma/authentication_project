// const { userModel } = require("../Models/RegisterModel");

// const getUsers = async (req, res) => {
//   try {
//     const users = await userModel.find({});
//     res.status(200).json({
//       responseMessage: "Users fetched successfully",
//       data: users,
//     });
//   } catch (err) {
//     res.status(500).json({
//       responseMessage: "Error in fetching data",
//     });
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     const { name, email, address } = req.body;
//     const { id } = req.params;

//     const existingUser = await userModel.findOne({ id });
//     if (existingUser) {
//       return res.status(403).json({
//         mesage: "user already exist",
//       });
//     }
//     const userData = new userModel({ name, email, address });
//     await userData.save();

//     res.status(201).json({
//       message: "user created successfully",
//       userData,
//     });
//   } catch (err) {
//     res.status(500).json({
//       responseMessage: "Error in fetching data",
//     });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { name, email, address } = req.body;
//     const { id } = req.params;
//     const updateData = {};
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;
//     if (address) updateData.address = address;

//     const updatedData = await userModel.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedData) {
//       return res.status(404).json({
//         message: "data don't exist",
//       });
//     }
//     res.status(200).json({
//       mesage: "user updated successfully",
//       data: updatedData,
//     });
//   } catch (err) {
//     res.status(500).json({
//       responseMessage: "Error in fetching data",
//     });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const existingUser = userModel.findByIdAndDelete(id);
//     if (!existingUser) {
//       return res.status(404).json({
//         message: "user not found",
//       });
//     }
//     res.status(200).json({
//       message: "user deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       responseMessage: "Error in fetching data",
//     });
//   }
// };

// module.exports = { getUsers, createUser, updateUser, deleteUser };

const bcrypt = require("bcrypt");
const jwt = require("jonwebtoken");
const userModel = require("../Models/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist, you can login!!",
      });
    }
    const userData = new userModel({ name, email, password });
    userData.password = await bcrypt.hash(password, 10);
    await userData.save();

    res.status(201).json({
      message: "signup successfull!!",
    });
  } catch (err) {
    res.status(500).json({
      responseMessage: "Faied to signup!!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        responseMessage: "User not found!!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        responseMessage: "User not found!!",
      });
    }
    const jwt = userModel.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_Token,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login successfull!!",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      responseMessage: "Faied to login!!",
    });
  }
};
module.expprts = { signup, login };

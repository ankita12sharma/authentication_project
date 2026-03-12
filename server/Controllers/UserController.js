// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const UserModel = require("../Models/UserModel");

// // SIGNUP
// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const user = await UserModel.findOne({ email });
//     if (user) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists, please login",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const usermodel = new UserModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await usermodel.save();

//     res.status(201).json({
//       success: true,
//       message: "Signup successful",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // LOGIN
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(403).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(403).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       { email: user.email, _id: user._id },
//       process.env.JWT_Token,
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       name: user.name,
//       email: user.email,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = { signup, login };

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User  already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);

    await userModel.save();
    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_Token,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  signup,
  login,
};

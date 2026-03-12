const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("register_users", registerSchema);

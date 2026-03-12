const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  emp_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("employee", EmployeeSchema);

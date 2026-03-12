const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("post", PostSchema);

// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const ProductRouter = require("./Routes/ProductRoute");
// const PostRouter = require("./Routes/PostRoute");
// const CategoryRouter = require("./Routes/CategoriesRoute");
// const UserRouter = require("./Routes/UserRoute");
// const EmployeeRouter = require("./Routes/EmployeeRoute");
// require("dotenv").config();

// const PORT = 8015;

// mongoose
//   .connect("mongodb://localhost:27017/AuthDB", {})
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// app.use(bodyParser.json());
// app.use(cors());
// app.use("/", ProductRouter);
// app.use("/", PostRouter);
// app.use("/", CategoryRouter);
// app.use("/", UserRouter);
// app.use("/", EmployeeRouter);

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const ProductRouter = require("./Routes/ProductRoute");
const PostRouter = require("./Routes/PostRoute");
const CategoryRouter = require("./Routes/CategoriesRoute");
const UserRouter = require("./Routes/UserRoute");
const EmployeeRouter = require("./Routes/EmployeeRoute");
const RegisterRouter = require("./Routes/RegisterRoute");

const app = express();
const PORT = 8015;

mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("Connected to mongodb succesfully!!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Route-level middleware
app.use("/", ProductRouter);
app.use("/", PostRouter);
app.use("/", CategoryRouter);
app.use("/", UserRouter);
app.use("/", EmployeeRouter);
app.use("/", RegisterRouter);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const EmployeeModel = require("../Models/EmployeeModel");
const ProductModel = require("../Models/ProductModel");

//create
const createProduct = async (req, res) => {
  try {
    const { name, quantity, price, req_date, category } = req.body;
    const products = await ProductModel.findOne({ name });
    if (products) {
      return res.status(403).json({
        responseCode: "403",
        responseMessage: "Data already exist!!",
      });
    }
    const productData = new ProductModel({
      name,
      quantity,
      price,
      req_date: new Date(req_date),
      category,
    });
    await productData.save();
    res.status(201).json({
      responseCode: "201",
      responseMessage: "Data created successfully!!",
      productData,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in creating  data!!",
    });
  }
};

//get
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Data fetched successfully!!",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in fetching data!!",
    });
  }
};

//update
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, req_date, category } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (quantity) updateData.quantity = quantity;
    if (price) updateData.price = price;
    if (req_date) updateData.req.date = new Date(req_date);
    if (category) updateData.category = category;

    const updatedData = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedData) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "Data not found!!",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Data updated successfully!!",
      data: updatedData,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in fetching data!!",
    });
  }
};

//delete
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await ProductModel.findByIdAndDelete(id);
    if (!existingProduct) {
      return res.status(404).json({
        responseCode: "404",
        responseMessage: "Product not found!!",
      });
    }
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Data deleted successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Error in deleting data!!",
    });
  }
};

// const getProductsByRange = async (req, res) => {
//   try {
//     const start = Number(req.query.start);
//     const end = Number(req.query.end);

//     if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid range values. Ensure start >= 1 and end >= start.",
//       });
//     }

//     const skip = start - 1;
//     const limit = end - start + 1;

//     const [products, totalRecords] = await Promise.all([
//       ProductModel.find().skip(skip).limit(limit),
//       ProductModel.countDocuments(),
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Products fetched successfully",
//       meta: {
//         start,
//         end,
//         returnedRecords: products.length,
//         totalRecords,
//       },
//       data: products,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       responseCode: "500",
//       responseMessage: "Unable to fetch records!!",
//     });
//   }
// };

const getProductsByRange = async (req, res) => {
  try {
    //const start = Number(req.query.start);
    //const end = Number(req.query.end);

    const page = Number(req.query.page) || 1; // default page 1
    const limit = Number(req.query.limit) || 4; // default 5 records per page

    // if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid range values. Ensure start >= 1 and end >= start.",
    //   });
    // }

    //const skip = start - 1;
    //const limit = end - start + 1;
    const skip = (page - 1) * limit;

    const [products, totalRecords] = await Promise.all([
      ProductModel.find().skip(skip).limit(limit),
      ProductModel.countDocuments(),
    ]);

    return res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      meta: {
        page,
        limit,
        returnedRecords: products.length,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get products greater than price
const getProductsByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    let filter = {};
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }
    const product_data = await ProductModel.find(filter);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: product_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

const getProductByDate = async (req, res) => {
  try {
    const { req_date } = req.query;
    let filter = {};
    if (req_date) {
      filter.req_date = {};
      filter.req_date.$gt = new Date(req_date);
      const product_data = await ProductModel.find(filter);
      res.status(200).json({
        responseCode: "200",
        responseMessage: "Records fetched successfully!!",
        data: product_data,
      });
    }
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//OR
const getFilteredProducts = async (req, res) => {
  try {
    const { category, maxPrice } = req.query;

    const filter = {};

    if (category || maxPrice) {
      filter.$or = [];

      if (category) {
        filter.$or.push({ category });
      }

      if (maxPrice) {
        filter.$or.push({ price: { $lt: Number(maxPrice) } });
      }
    }

    const products = await ProductModel.find(filter);

    return res.status(200).json({
      responseCode: 200,
      responseMessage: "Records fetched successfully!!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      responseCode: 500,
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//sort by asc and desc  // sort by limit
const sortByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice, sort } = req.query;
    const filter = {};
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }
    let sortOption = {};
    if (sort === "asc") {
      sortOption.price = 1;
    } else if (sort === "desc") {
      sortOption.price = -1;
    }
    const sort_data = await ProductModel.find(filter).sort(sortOption).limit(5);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: sort_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

//1.	Search product name containing "Laptop"
const searchByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        responseCode: "400",
        responseMessage: "Name field required!!",
      });
    }
    const filter = {};
    if (name) {
      filter.name = {
        $regex: name,
        $options: "i", //case insensitive
      };
    }
    const search_data = await ProductModel.find(filter);
    res.status(200).json({
      responseCode: "200",
      responseMessage: "Records fetched successfully!!",
      data: search_data,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to fetch records!!",
    });
  }
};

const updateByPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    // const updateData = {};
    // if (price) updateData.price = price;

    const updatedData = await ProductModel.updateOne(
      { _id: id }, // filter
      { $set: { price } },
      {
        runValidators: true,
      },
    );

    if (updatedData.matchedCount === 0) {
      res.status(404).json({
        code: "404",
        message: "Record not found!!",
      });
    }
    res.status(200).json({
      code: "200",
      msg: "Record updated!!",
      data: updatedData,
      updatedPrice: updatedData.price,
    });
  } catch (err) {
    res.status(500).json({
      responseCode: "500",
      responseMessage: "Unable to update record!!",
    });
  }
};

//products under 500
const deleteProductsUnderPrice = async (req, res) => {
  try {
    const { price } = req.query;
    if (!price) {
      return res.status(400).json({
        code: "400",
        message: "Price is required",
      });
    }
    const price_data = await ProductModel.deleteMany({
      price: { $lt: Number(price) },
    });
    if (price_data.deletedCount === 0) {
      return res.status(404).json({
        code: "404",
        message: "Record not found!!",
      });
    }
    res.status(200).json({
      code: "200",
      msg: "Records deleted successfully!!",
    });
  } catch (err) {
    res.status(500).json({
      code: "500",
      message: "Unable to fetch records!!",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByRange,
  getProductsByPrice,
  getProductByDate,
  getFilteredProducts,
  sortByPrice,
  searchByName,
  updateByPrice,
  deleteProductsUnderPrice,
};

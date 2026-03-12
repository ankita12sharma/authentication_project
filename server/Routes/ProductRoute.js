const express = require("express");
const {
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
} = require("../Controllers/ProductController");
//const Products = require("../Controllers/ProductController");
const router = new express.Router();

router.post("/createproduct", createProduct);
router.get("/getproducts", getProducts);
router.get("/getbyprice", getProductsByPrice);
router.get("/getbydate", getProductByDate);
router.get("/orprod", getFilteredProducts);
router.get("/sortpro", sortByPrice);
router.get("/searchbyname", searchByName);
router.get("/range", getProductsByRange);

router.put(`/updateproduct/:id`, updateProduct);
router.put(`/updatebyprice/:id`, updateByPrice);

router.delete(`/deleteproduct/:id`, deleteProduct);
router.delete(`/delproduct`, deleteProductsUnderPrice);

module.exports = router;

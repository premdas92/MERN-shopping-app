const express = require("express");
const {
  createproduct,
  getAllProducts,
  getProductById,
  getAllProductsByCategory,
  updateProductDetails,
  deleteProduct,
  searchProducts,
} = require("../controllers/product-controller");
const { userAuth } = require("../middlewares/user-auth");
const adminAuth = require("../middlewares/admin-auth");

const productRouter = express.Router();

productRouter.post("/", userAuth, adminAuth, createproduct);
productRouter.get("/", userAuth, getAllProducts);
productRouter.get("/category/:category", userAuth, getAllProductsByCategory);
productRouter.get("/search", userAuth, searchProducts);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id/edit", userAuth, adminAuth, updateProductDetails);
productRouter.delete("/:id", userAuth, adminAuth, deleteProduct);

module.exports = productRouter;

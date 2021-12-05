const express = require("express");
//Controllers
const {
  productController: {
    addProduct,
    getAllProducts,
    adminGetProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    addReview,
    deleteReview,
  },
} = require("../controllers");
//Middlewares
const { isLoggedIn, customRole } = require("../middlewares");

const productRoutes = express.Router();

//Routes
productRoutes.get("/products", getAllProducts);
productRoutes
  .route("/products/review")
  .put(isLoggedIn, addReview)
  .delete(isLoggedIn, deleteReview);

productRoutes.post(
  "/admin/products/add",
  isLoggedIn,
  customRole("admin"),
  addProduct
);

productRoutes
  .route("/admin/products/:id")
  .get(isLoggedIn, customRole("admin"), adminGetProduct)
  .put(isLoggedIn, customRole("admin"), adminUpdateProduct)
  .delete(isLoggedIn, customRole("admin"), adminDeleteProduct);

module.exports = productRoutes;

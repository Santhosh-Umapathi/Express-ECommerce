const express = require("express");
//Controllers
const { addProduct, getAllProducts } = require("../controllers");
//Middlewares
const { isLoggedIn, customRole } = require("../middlewares");

const productRoutes = express.Router();

//Routes
productRoutes.get("/products", getAllProducts);

productRoutes.post(
  "/admin/products/add",
  isLoggedIn,
  customRole("admin"),
  addProduct
);

module.exports = productRoutes;

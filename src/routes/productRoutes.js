const express = require("express");
//Controllers
const { testProduct } = require("../controllers");
//Middlewares
const { isLoggedIn, customRole } = require("../middlewares");

const productRoutes = express.Router();

//Routes
productRoutes.get("/products", testProduct);

module.exports = productRoutes;

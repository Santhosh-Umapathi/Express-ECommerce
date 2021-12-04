const express = require("express");
//Controllers
const {
  orderController: { createOrder },
} = require("../controllers");
//Middleware
const { isLoggedIn } = require("../middlewares");

const orderRoutes = express.Router();

//Routes
orderRoutes.post("/order/create", isLoggedIn, createOrder);

module.exports = orderRoutes;

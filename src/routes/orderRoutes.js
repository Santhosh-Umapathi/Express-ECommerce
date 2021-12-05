const express = require("express");
//Controllers
const {
  orderController: {
    createOrder,
    getOneOrder,
    getUserOrders,
    adminGetAllOrders,
    adminUpdateOrder,
    adminDeleteOrder,
  },
} = require("../controllers");
//Middleware
const { isLoggedIn, customRole } = require("../middlewares");

const orderRoutes = express.Router();

//Routes
orderRoutes.post("/order/create", isLoggedIn, createOrder);
orderRoutes.get("/order/myorders", isLoggedIn, getUserOrders);
orderRoutes.get("/order/:id", isLoggedIn, getOneOrder);

//Admin Routes
orderRoutes.get(
  "/admin/order",
  isLoggedIn,
  customRole("admin"),
  adminGetAllOrders
);

orderRoutes
  .route("/admin/order/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);

module.exports = orderRoutes;

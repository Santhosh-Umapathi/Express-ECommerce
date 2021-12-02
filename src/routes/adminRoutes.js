const express = require("express");
//Controllers
const { getAllUsers, getUsers } = require("../controllers");
//Middlewares
const { isLoggedIn, customRole } = require("../middlewares");

const adminRoutes = express.Router();

//Routes
adminRoutes.get(
  "/admin/users",
  isLoggedIn,
  customRole("admin", "manager"),
  getAllUsers
);
adminRoutes.get("/manager/users", isLoggedIn, customRole("manager"), getUsers);

module.exports = adminRoutes;

const express = require("express");
//Controllers
const {
  adminController: {
    getAllUsers,
    getUsers,
    getOneUser,
    adminUpdateUser,
    adminDeleteOneUser,
  },
} = require("../controllers");
//Middlewares
const { isLoggedIn, customRole } = require("../middlewares");

const adminRoutes = express.Router();

//Routes
adminRoutes.get("/admin/users", isLoggedIn, customRole("admin"), getAllUsers);
//Method 1
adminRoutes
  .route("/admin/users/:id")
  .get(isLoggedIn, customRole("admin"), getOneUser)
  .put(isLoggedIn, customRole("admin"), adminUpdateUser)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOneUser);

//Method 2
// adminRoutes
//   .get("/admin/users/:id", isLoggedIn, customRole("admin"), getOneUser)
//   .put("/admin/users/:id", isLoggedIn, customRole("admin"), adminUpdateUser);
//Method 3
// adminRoutes.get(
//   "/admin/users/:id",
//   isLoggedIn,
//   customRole("admin"),
//   getOneUser
// );
// adminRoutes.put(
//   "/admin/users/:id",
//   isLoggedIn,
//   customRole("admin"),
//   adminUpdateUser
// );

adminRoutes.get(
  "/manager/users",
  isLoggedIn,
  customRole("admin", "manager"),
  getUsers
);

module.exports = adminRoutes;

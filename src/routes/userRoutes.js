const express = require("express");
//Controllers
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
  updatePassword,
} = require("../controllers");
//Middlewares
const { isLoggedIn } = require("../middlewares");

const userRoutes = express.Router();

//Routes
userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);
userRoutes.post("/forgotpassword", forgotPassword);
userRoutes.post("/password/reset/:token", resetPassword);
userRoutes.get("/userdashboard", isLoggedIn, getLoggedInUserDetails);
userRoutes.post("/password/update", isLoggedIn, updatePassword);

module.exports = userRoutes;

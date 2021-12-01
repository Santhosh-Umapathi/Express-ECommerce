const express = require("express");
//Controllers
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers");

const userRoutes = express.Router();

//Routes
userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);
userRoutes.post("/forgotpassword", forgotPassword);
userRoutes.post("/password/reset/:token", resetPassword);

module.exports = userRoutes;

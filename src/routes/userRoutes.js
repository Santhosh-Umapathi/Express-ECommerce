const express = require("express");
//Controllers
const { signUp, login, logout } = require("../controllers");

const userRoutes = express.Router();

//Routes
userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/logout", logout);

module.exports = userRoutes;

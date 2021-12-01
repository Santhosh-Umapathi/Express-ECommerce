const express = require("express");
//Controllers
const { signUp, login } = require("../controllers");

const userRoutes = express.Router();

//Routes
userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);

module.exports = userRoutes;

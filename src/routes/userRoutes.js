const express = require("express");
//Controllers
const { signUp } = require("../controllers");

const userRoutes = express.Router();

//Routes
userRoutes.post("/signup", signUp);

module.exports = userRoutes;

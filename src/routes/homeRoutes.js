const express = require("express");
//Controllers
const { home } = require("../controllers");

const homeRoutes = express.Router();

//Routes
homeRoutes.get("/", home);

module.exports = homeRoutes;

const express = require("express");
//Controllers
const { homeController } = require("../controllers");

const homeRoutes = express.Router();

//Routes
homeRoutes.get("/", homeController);

module.exports = homeRoutes;

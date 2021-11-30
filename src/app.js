const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

//Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
// ENV's
const { API_ROUTE } = process.env;

//Routes
const { homeRoutes } = require("./routes");

const app = express();
// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//External
app.use(cookieParser());
app.use(fileUpload());
//Logger
app.use(morgan("tiny"));

//------------------------------------------------------------------
//MARK: Routes Handling
//------------------------------------------------------------------

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Common Routes
app.use(API_ROUTE, homeRoutes);

module.exports = app;

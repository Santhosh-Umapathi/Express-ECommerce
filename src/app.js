const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
// ENV's
const { API_ROUTE } = process.env;
//Error
const { CustomError } = require("./error");

//Routes
const {
  homeRoutes,
  userRoutes,
  adminRoutes,
  productRoutes,
  paymentRoutes,
  orderRoutes,
} = require("./routes");

const app = express();
// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//External
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//Logger
app.use(morgan("tiny"));

//------------------------------------------------------------------
//MARK: Routes Handling
//------------------------------------------------------------------

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Common Routes
app.use(API_ROUTE, homeRoutes);
app.use(API_ROUTE, userRoutes);
app.use(API_ROUTE, adminRoutes);
app.use(API_ROUTE, productRoutes);
app.use(API_ROUTE, paymentRoutes);
app.use(API_ROUTE, orderRoutes);

//Unsupported Routes
app.use((req, res, next) => {
  const error = new CustomError("Route not found", 404);
  throw error;
});

//Error Boundary
app.use((error, req, res, next) => {
  console.log("🚀 --- error boundary", error, error.message);
  res.status(error.code || 500);
  res.json({ message: error.message || "Unknown error occured" });
});

module.exports = app;

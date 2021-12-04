const express = require("express");
//Controllers
const {
  paymentController: { captureStripePayment, sendStripeKey },
} = require("../controllers");
//Middlewares
const { isLoggedIn } = require("../middlewares");

const paymentRoutes = express.Router();

//Routes
paymentRoutes.get("/stripe/key", isLoggedIn, sendStripeKey);
paymentRoutes.post("/stripe/payment", isLoggedIn, captureStripePayment);

module.exports = paymentRoutes;

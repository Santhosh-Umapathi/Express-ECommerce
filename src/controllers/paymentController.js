const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Razorpay = require("razorpay");

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Stripe
//Just sending the publishable key to Client, Publish key is safe to share
const sendStripeKey = BigPromise(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, stripeKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

const captureStripePayment = BigPromise(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",
    // payment_method_types: ["card"],
    // receipt_email: "jenny.rosen@example.com",
    //Optional
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
    paymentIntent,
  });
});

//Razorpay
const sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorpaykey: process.env.RAZORPAY_API_KEY,
  });
});

const captureRazorpayPayment = BigPromise(async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  var options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
  };
  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: myOrder,
  });
});

module.exports = {
  sendStripeKey,
  captureStripePayment,
  sendRazorpayKey,
  captureRazorpayPayment,
};

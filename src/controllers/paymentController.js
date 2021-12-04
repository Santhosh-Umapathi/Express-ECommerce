const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");
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

module.exports = { sendStripeKey, captureStripePayment };

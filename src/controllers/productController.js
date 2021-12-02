const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { UserModel } = require("../models");
//Utils
const { cookieToken, mail } = require("../utils");

const testProduct = BigPromise(async (req, res, next) => {
  res.status(200).json({ success: true, message: "test Product" });
});

module.exports = {
  testProduct,
};

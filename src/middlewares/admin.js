const jwt = require("jsonwebtoken");
const BigPromise = require("./BigPromise");
const { UserModel } = require("../models");
const { CustomError } = require("../error");

exports.customRole = (...roles) => {
  console.log("🚀 --- roles", roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("Not allowed to access this resource", 401));
    }
    next();
  };
};

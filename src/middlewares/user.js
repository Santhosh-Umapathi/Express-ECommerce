const jwt = require("jsonwebtoken");
const BigPromise = require("./BigPromise");
const { UserModel } = require("../models");
const { CustomError } = require("../error");

const isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer ", "") ||
    null;

  if (!token) {
    return next(new CustomError("Not Logged In", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decoded.id);

  next();
});

module.exports = isLoggedIn;

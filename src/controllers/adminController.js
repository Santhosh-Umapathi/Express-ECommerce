const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { UserModel, ProductModel } = require("../models");
//Utils
const { cookieToken, mail } = require("../utils");

const getAllUsers = BigPromise(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({ success: true, users });
});

const getOneUser = BigPromise(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  res.status(200).json({ success: true, user });
});

const getUsers = BigPromise(async (req, res, next) => {
  const users = await UserModel.find({ role: "user" });

  res.status(200).json({ success: true, users });
});

const adminUpdateUser = BigPromise(async (req, res, next) => {
  const { name, email, role } = req.body;

  const userId = req.params.id;

  const newData = {
    name,
    email,
    role,
  };

  const user = await UserModel.findByIdAndUpdate(userId, newData, {
    runValidators: true,
    new: true,
    // useFindAndModify: false,
  });

  res.status(202).json({ success: true, message: "Updated user successfully" });
});

const adminDeleteOneUser = BigPromise(async (req, res, next) => {
  const userId = req.params.id;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new CustomError("User not found", 404));
  }

  await cloudinary.uploader.destroy(user.photo.id);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Delete User",
  });
});

module.exports = {
  getAllUsers,
  getUsers,
  getOneUser,
  adminUpdateUser,
  adminDeleteOneUser,
};

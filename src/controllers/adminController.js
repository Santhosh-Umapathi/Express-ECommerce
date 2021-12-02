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

const getAllUsers = BigPromise(async (req, res, next) => {
  const users = await UserModel.find();

  res.status(200).json({ success: true, users });
});

const getUsers = BigPromise(async (req, res, next) => {
  const users = await UserModel.find({ role: "user" });

  res.status(200).json({ success: true, users });
});

module.exports = {
  getAllUsers,
  getUsers,
};

const cloudinary = require("cloudinary").v2;
//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { UserModel } = require("../models");
//Utils
const { cookieToken } = require("../utils");

const signUp = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;

  let imageResult;
  if (!req.files) {
    return next(new CustomError("File required", 403));
  }

  //Image Upload - Cloudinary
  if (req.files) {
    let file = req.files.photo;

    imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "express-ecommerce/users",
      width: 150,
      crop: "scale",
    });
  }

  if (!email || !name || !password) {
    return next(new CustomError("All fields is required", 403));
  }

  const user = await UserModel.create({
    name,
    email,
    password,
    photo: {
      id: imageResult?.public_id,
      secure_url: imageResult?.secure_url,
    },
  });

  //Create cookie and send response
  cookieToken(user, res);
});

module.exports = {
  signUp,
};

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

//------------------------------------------------------------------
//MARK: Controllers
//------------------------------------------------------------------
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

const login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("All fields is required", 403));
  }

  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomError("Email or Password incorrect", 401));
  }

  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    return next(new CustomError("Email or Password incorrect", 401)); //Same error message to avoid attacks
  }

  //Create cookie and send response
  cookieToken(user, res);
});

const logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logout Success" });
});

const forgotPassword = BigPromise(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new CustomError("Email is required", 403));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(new CustomError("User not found", 401));
  }

  const forgotToken = user.getForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${forgotToken}`;

  const message = `Copy & Paste this link to reset password \n \n ${resetUrl}`;

  try {
    await mail({
      message,
      subject: "Reset your password",
      resetUrl,
      toEmail: email,
    });

    res.status(200).json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    //Clear the values if email fails
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new CustomError(error.message, 500));
  }
});

const resetPassword = BigPromise(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  //Encrpyt the token again to compare
  const encryptedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //Search for same encrypted token and check expiry
  const user = await UserModel.findOne({
    forgotPasswordToken: encryptedToken,
    // forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Token is invalid or expired", 401));
  }

  //Compare password matches
  if (password !== confirmPassword) {
    return next(new CustomError("Passwords do not match", 401));
  }

  //Update the password
  user.password = password;
  //Reset the forgot fields
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  console.log("🚀 --- resetPassword --- user", user);

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

const getLoggedInUserDetails = BigPromise(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = BigPromise(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const userId = req.user.id;

  const user = await UserModel.findOne({ userId }).select("+password");
  if (!user) {
    return next(new CustomError("User not found", 401));
  }
  const isOldPasswordCorrect = await user.isValidPassword(oldPassword);
  if (!isOldPasswordCorrect) {
    return next(new CustomError("Password is incorrect", 401));
  }

  user.password = newPassword;

  await user.save();

  cookieToken(user, res);
});

const updateUser = BigPromise(async (req, res, next) => {
  const { name, email } = req.body;

  const userId = req.user.id;

  const newData = {
    name,
    email,
  };

  let imageResult;
  if (req.files) {
    const res = await UserModel.findById(userId);
    const imageId = res.photo.id;

    //Delete existing image
    const response = await cloudinary.uploader.destroy(imageId);
    //Upload new image
    let file = req.files.photo;
    imageResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "express-ecommerce/users",
      width: 150,
      crop: "scale",
    });

    newData.photo = {
      id: imageResult?.public_id,
      secure_url: imageResult?.secure_url,
    };
  }

  const user = await UserModel.findByIdAndUpdate(userId, newData, {
    runValidators: true,
    new: true,
    // useFindAndModify: false,
  });

  cookieToken(user, res);
});

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
  updatePassword,
  updateUser,
};

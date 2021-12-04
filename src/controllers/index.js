const { home } = require("./homeController");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
  updatePassword,
  updateUser,
} = require("./userController");

const {
  getAllUsers,
  getUsers,
  getOneUser,
  adminUpdateUser,
  adminDeleteOneUser,
} = require("./adminController");

const {
  addProduct,
  getAllProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  addReview,
  deleteReview,
} = require("./productController");

const paymentController = require("./paymentController");
const orderController = require("./orderController");

module.exports = {
  home,
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getLoggedInUserDetails,
  updatePassword,
  updateUser,
  getAllUsers,
  getUsers,
  getOneUser,
  adminUpdateUser,
  adminDeleteOneUser,
  addProduct,
  getAllProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  addReview,
  deleteReview,
  paymentController,
  orderController,
};

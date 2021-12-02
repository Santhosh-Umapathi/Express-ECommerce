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
};

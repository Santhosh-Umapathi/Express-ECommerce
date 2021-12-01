const { home } = require("./homeController");
const {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("./userController");

module.exports = {
  home,
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
};

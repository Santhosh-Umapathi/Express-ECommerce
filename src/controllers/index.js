const { home } = require("./homeController");
const { signUp, login, logout } = require("./userController");

module.exports = {
  home,
  signUp,
  login,
  logout,
};

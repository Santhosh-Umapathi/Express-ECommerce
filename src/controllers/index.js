const { home } = require("./homeController");
const { signUp, login } = require("./userController");

module.exports = {
  home,
  signUp,
  login,
};

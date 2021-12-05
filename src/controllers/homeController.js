const { BigPromise } = require("../middlewares");

const home = BigPromise(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Home ",
  });
});

module.exports = home;

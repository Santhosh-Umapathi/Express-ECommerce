const home = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Home ",
  });
};

module.exports = { home };

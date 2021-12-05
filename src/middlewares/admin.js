const { CustomError } = require("../error");

const customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError("Not allowed to access this resource", 401));
    }
    next();
  };
};

module.exports = customRole;

//Create a cookie
const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  user.password = undefined; //Not sent to client

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ), //3 days
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;

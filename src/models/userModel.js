const mongoose = require("mongoose");
const validator = require("validator").default;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const COLLECTION_NAME = "users";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Name"],
    maxlength: [40, "Name should be under 40 chars"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minlength: [6, "Password should be atleast 6 chars"],
    select: false, //does not return on the fetch from db (not working)
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: { type: String, required: true },
    secure_url: { type: String, required: true },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
});

//Runs before saving - Middleware for Mongoose
userSchema.pre("save", async function (next) {
  //Exit if already hashed
  if (!this.isModified("password")) {
    return next();
  }
  //Hash only on first time/forgot password
  this.password = await bcryptjs.hash(this.password, 10);
});

//Validate the password with user password
userSchema.methods.isValidPassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

//Create JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

// Generate Forgot Password Token
userSchema.methods.getForgotPasswordToken = function () {
  const forgotToken = crypto.randomBytes(20).toString("hex"); //Random String, sent to user

  // Generating advanced hash - Stored only in db to compare later
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() * 20 * 60 * 1000; // 20 mins

  return forgotToken;
};

module.exports = mongoose.model(COLLECTION_NAME, userSchema);

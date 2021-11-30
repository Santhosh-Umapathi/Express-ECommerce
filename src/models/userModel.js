const mongoose = require("mongoose");
const validator = require("validator").default;

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
    select: false, //does not return on the fetch from db
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
  forgotPasswordExpiry: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(COLLECTION_NAME, userSchema);

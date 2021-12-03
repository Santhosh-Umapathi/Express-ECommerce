const mongoose = require("mongoose");
const validator = require("validator").default;

const COLLECTION_NAME = "products";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Product Name"],
    trim: true,
    maxlength: [120, "Name should be under 120 chars"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a Product Price"],
    maxlength: [5, "Price should be under 5 digits"],
  },
  description: {
    type: String,
    required: [true, "Please provide a Description"],
  },
  photos: [
    {
      id: { type: String, required: true },
      secure_url: { type: String, required: true },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "Please select a Category from - shortsleeves | longsleeves | sweatshirt | hoodies",
    ],
    enum: {
      values: ["shortsleeves", "longsleeves", "sweatshirt", "hoodies"],
      message:
        "Please select a Category ONLY from - shortsleeves | longsleeves | sweatshirt | hoodies",
    },
  },
  brand: {
    type: String,
    required: [true, "Please add a Brand"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(COLLECTION_NAME, productSchema);

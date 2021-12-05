const mongoose = require("mongoose");

const COLLECTION_NAME = "orders";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
    city: {
      type: String,
      required: [true, "Please provide a city"],
    },
    state: {
      type: String,
      required: [true, "Please provide a state"],
    },
    zip: {
      type: String,
      required: [true, "Please provide a zip"],
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    phoneNo: {
      type: String,
      required: [true, "Please provide a phoneNo"],
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: [true, "Please provide a name"],
      },
      price: {
        type: Number,
        required: [true, "Please provide a price"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide a quantity"],
      },
      image: {
        type: String,
        required: [true, "Please provide a image"],
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: { type: String, required: [true, "Please provide a image"] },
  },
  taxAmount: {
    type: Number,
    required: [true, "Please provide a taxAmount"],
  },
  shippingAmount: {
    type: String,
    required: [true, "Please provide a shippingAmount"],
  },
  totalAmount: {
    type: String,
    required: [true, "Please provide a totalAmount"],
  },
  orderStatus: {
    type: String,
    required: [true, "Please provide a orderStatus"],
    default: "processing",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: [true, "Please provide a Stock number"],
  },
});

module.exports = mongoose.model(COLLECTION_NAME, orderSchema);

const cloudinary = require("cloudinary").v2;

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { ProductModel, OrderModel } = require("../models");
//Utils
const { updateStock } = require("../utils");

const createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await OrderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user.id,
  });

  res.status(200).json({ success: true, order });
});

const getOneOrder = BigPromise(async (req, res, next) => {
  const { id } = req.params;

  // Get user info from user model, only name and email fields
  const order = await OrderModel.findById(id).populate("user", "name email");

  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  res.status(200).json({ success: true, order });
});

const getUserOrders = BigPromise(async (req, res, next) => {
  const { id } = req.user;

  // Get user info from user model, only name and email fields
  const order = await OrderModel.find({ user: id });

  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  res.status(200).json({ success: true, order });
});

const adminGetAllOrders = BigPromise(async (req, res, next) => {
  // Get user info from user model, only name and email fields
  const orders = await OrderModel.find();

  res.status(200).json({ success: true, orders });
});

const adminUpdateOrder = BigPromise(async (req, res, next) => {
  const { orderStatus } = req.body;

  // Get user info from user model, only name and email fields
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  if (order.orderStatus === "delivered") {
    return next(new CustomError("Order already marked as delivered", 404));
  }

  order.orderStatus = orderStatus;

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity, next);
  });

  await order.save();

  res.status(200).json({ success: true, order });
});

const adminDeleteOrder = BigPromise(async (req, res, next) => {
  // Get user info from user model, only name and email fields
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }

  await order.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  createOrder,
  getOneOrder,
  getUserOrders,
  adminGetAllOrders,
  adminUpdateOrder,
  adminDeleteOrder,
};

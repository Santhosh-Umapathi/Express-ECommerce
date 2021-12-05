const { CustomError } = require("../error");
const { ProductModel } = require("../models");

const updateStock = async (productId, quantity, next) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    return next(new CustomError("Product not found", 404));
  }
  product.stock = product.stock - quantity;

  await product.save();
  return next();
};

module.exports = updateStock;

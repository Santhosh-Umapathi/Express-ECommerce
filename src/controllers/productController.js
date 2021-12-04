const cloudinary = require("cloudinary").v2;

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { ProductModel } = require("../models");
//Utils
const { WhereClause } = require("../utils");

const addProduct = BigPromise(async (req, res, next) => {
  let imagesArray = [];
  if (!req.files) {
    return next(new CustomError("Images are required", 401));
  }

  //Image Upload
  if (req.files.photos.length > 0) {
    let result;
    //Multiple Image Upload
    for (let key in req.files.photos) {
      result = await cloudinary.uploader.upload(
        req.files.photos[key].tempFilePath,
        { folder: "express-ecommerce/products" }
      );

      imagesArray.push({
        id: result?.public_id,
        secure_url: result?.secure_url,
      });
    }
  } else {
    //Single Image Upload
    result = await cloudinary.uploader.upload(req.files.photos.tempFilePath, {
      folder: "express-ecommerce/products",
    });

    imagesArray.push({
      id: result?.public_id,
      secure_url: result?.secure_url,
    });
  }

  req.body.photos = imagesArray; //Overrite photos field after image upload
  req.body.user = req.user.id;

  const product = await ProductModel.create(req.body);

  res.status(200).json({ success: true, product });
});

const getAllProducts = BigPromise(async (req, res, next) => {
  const pageLimit = 6;
  const totalProductCount = await ProductModel.countDocuments();

  const productsObject = new WhereClause(ProductModel.find(), req.query)
    .search()
    .filter();

  let products = await productsObject.base.clone();

  productsObject.pagination(pageLimit);
  products = await productsObject.base; //Running the final query

  const filteredProductCount = products.length;

  res
    .status(200)
    .json({ success: true, products, filteredProductCount, totalProductCount });
});

const adminGetProduct = BigPromise(async (req, res, next) => {
  const productId = req.params.id;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

const adminUpdateProduct = BigPromise(async (req, res, next) => {
  const productId = req.params.id;

  let product = await ProductModel.findById(productId);

  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  let imagesArray = [];
  if (!req.files) {
    return next(new CustomError("Images are required", 401));
  }

  //Image Delete and Upload
  if (req.files) {
    //Delete the previous Image
    for (let key in product.photos) {
      product.photos[key].id &&
        cloudinary.uploader.destroy(product.photos[key].id);
    }

    let result;
    //Upload the new Image
    if (req.files.photos.length > 0) {
      //Multiple Image Upload
      for (let key in req.files.photos) {
        result = await cloudinary.uploader.upload(
          req.files.photos[key].tempFilePath,
          { folder: "express-ecommerce/products" }
        );

        imagesArray.push({
          id: result?.public_id,
          secure_url: result?.secure_url,
        });
      }
    } else {
      //Single Image Upload
      result = await cloudinary.uploader.upload(req.files.photos.tempFilePath, {
        folder: "express-ecommerce/products",
      });

      imagesArray.push({
        id: result?.public_id,
        secure_url: result?.secure_url,
      });
    }
  }

  req.body.photos = imagesArray; //Overrite photos field after image upload
  req.body.user = req.user.id;

  product = await ProductModel.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

const adminDeleteProduct = BigPromise(async (req, res, next) => {
  const productId = req.params.id;

  let product = await ProductModel.findById(productId);

  if (!product) {
    return next(new CustomError("Product not found", 404));
  }

  //Delete the previous Image
  for (let key in product.photos) {
    product.photos[key].id &&
      cloudinary.uploader.destroy(product.photos[key].id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Successfully deleted",
  });
});

module.exports = {
  addProduct,
  getAllProducts,
  adminGetProduct,
  adminUpdateProduct,
  adminDeleteProduct,
};

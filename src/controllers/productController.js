const cloudinary = require("cloudinary").v2;

//Middlewares
const { BigPromise } = require("../middlewares");
//Error
const { CustomError } = require("../error");

//Model
const { ProductModel } = require("../models");
//Utils
const { WhereClause } = require("../utils");

//TODO: Issue, cannot add 2 products with same user, check
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

  console.log("req.body", req.body);

  const product = await ProductModel.create(req.body);
  console.log("product", product);

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

module.exports = {
  addProduct,
  getAllProducts,
};

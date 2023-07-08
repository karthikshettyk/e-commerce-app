import Product from "../models/product.schema.js";
import CustomError from "../utils/customError.js";
import formidable from "formidable";
import mongoose from "mongoose";
import config from "../config/index.js";
import fs from "fs";
import fileupload from "express-fileupload";
import cloudinary from "cloudinary";


//Create Product
export const createProduct = async (req, res) => {
  try {
    let product;
    if (!req.files) {
      return next(
        new CustomError("photo is required for uploading in the prodcts", 400)
      );
    }

    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function (err, fields, files) {
      if (err) {
        throw new CustomError(err.message || "Something went wrong", 500);
      }

      let productId = new Mongoose.Types.ObjectId().toHexString();

      console.log(fields, files);

      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId
      ) {
        throw new CustomError("Please fill all the fields", 500);
      }

      if (files) {
        return next(
          new CustomError("photo is required for uploading photos", 400)
        );
      }
      let file = req.files.photo;
      result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });

      product = await Product.create({
        name: fields.name,
        price: fields.price,
        description: fields.description,
        photo: {
          id: result.public_id,
          secure_url: result.secure_url,
        },
      });
    });

    if (!product) {
      throw new CustomError("Product failed to be created in DB", 400);
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Update Product By Id
export const updateProductById = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      throw new CustomError("No product found with that id", 404);
    }

    //to delete photo
    await cloudinary.uploader.destroy(product.photo.id);

    //to update new photo

    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async function (err, fields, files) {
      if (err) {
        throw new CustomError(err.message || "Something went wrong", 500);
      }

      let productId = new Mongoose.Types.ObjectId().toHexString();

      console.log(fields, files);

      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        !fields.collectionId
      ) {
        throw new CustomError("Please fill all the fields", 500);
      }

      if (files) {
        return next(
          new CustomError("photo is required for uploading photos", 400)
        );
      }
      let file = req.files.photo;
      result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "products",
      });

      (product.name = fields.name),
        (product.price = fields.price),
        (product.description = description),
        (product.photo = {
          id: result.public_id,
          secure_url: result.secure_url,
        }),
        await product.save();
    });

    //TODO: update product by id
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Read Product By Id
export const getProductById = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      throw new CustomError("No product found with that id", 404);
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (!products) {
      throw new CustomError("No products find", 404);
    }

    res.status(200).json({
      sucess: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Delete Product By Id
export const deleteProductById = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      throw new CustomError("No product found with that id", 404);
    }

    //TODO: Delete photos
    await cloudinary.uploader.destroy(product.photo.id);
    await product.remove();

    res.status(200).json({
      sucess: true,
      message: "product is deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

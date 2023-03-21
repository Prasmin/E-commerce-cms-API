import express from "express";
import { newProductValidation } from "../middlewares/joiMiddleware.js";
import {
  createProduct,
  getAllProducts,
} from "../models/product/ProductModel.js";
import slugify from "slugify";
import multer from "multer";

const router = express.Router();

const imgFolderPath = "public/img/products";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    //validation error check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    const fullFileName = Date.now() + "_" + file.originalname;
    cb(error, fullFileName);
  },
});
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({
      status: "success",
      message: "product lsit",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    console.log(req.body);

    req.body.slug = slugify(req.body.name, { trim: true, lower: true });
    const result = await createProduct(req.body);
    //get form data
    //get images

    if (result?._id) {
      return res.json({
        status: "success",
        message: "The product has been added!",
      });
    }

    res.json({
      status: "error",
      message: "Error adding new product, contact administration",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already another product has same sluge, Pelase change the produt name and try agnain later.";
    }
    next(error);
  }
});

export default router;

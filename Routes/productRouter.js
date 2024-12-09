import express from "express";
import { createProduct,getProducts } from "../Controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", createProduct); // Route to create product
productRouter.get("/", getProducts); // Route to get all products

export default productRouter;
import express from 'express';
import { getProducts, createProducts,deleteProduct,getProductsByName } from '../Controllers/productController.js';
  

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.get("/:name",getProductsByName);
productRouter.post("/",createProducts);
productRouter.delete("/",deleteProduct);









export default productRouter;




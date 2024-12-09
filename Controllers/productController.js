import Product from "../Models/product.js";
import { isAdmin } from "../Controllers/userController.js";



export function createProduct(req, res) {

if(!isAdmin(req)){
    res.json({
        message: "log as adminnn"
    })
    return



}

    const newProductData = req.body;

    const Product = new Product(newProductData);

    Product.save()
        .then(() => {
            res.status(201).json({ message: "Product created" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Product not created"});
        })

}


export function getProducts(req, res) {

    Product.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({ message: "Products not found" });
        })

}
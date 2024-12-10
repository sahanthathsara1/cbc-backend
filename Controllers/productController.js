import Product from "../Models/product.js";
import { isAdmin } from "../Controllers/userController.js";

export function createProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    const newProductData = req.body;

    const product = new Product(newProductData);

    product
        .save()
        .then(() => {
            res.status(201).json({ message: "Product created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to create product", error: error.message });
        });
}

export function getProducts(req, res) {
    Product.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to retrieve products", error: error.message });
        });
}

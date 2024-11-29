import Product from "../Models/product.js";

export function getProducts(req, res) {
    Product.find()
        .then((productlist) => {
            res.json({
                list: productlist,
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: "An error occurred while fetching the product list.",
                details: error.message,
            });
        });
}

export function createProducts(req, res) {
       console.log(req.user);

       if (!req.user) {
        return res.status(401).json({
            message: "not logged in"
        })
        return

       }
       if(req.user.type !== "admin"){
           return res.status(403).json({
               message: "you are not an admin"
           })
           return
       }
  


    const newProduct = new Product(req.body);

    newProduct
        .save()
        .then(() => {
            res.json({
                message: "Product created successfully",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Failed to create product",
                error: error.message,
            });
        });
}

export function deleteProduct(req, res) {
    const name = req.body.name;

    Product.find({ name: name })
        .then((productList) => {
            if (productList.length === 0) {
                res.status(404).json({
                    message: "No products found",
                });
            } else {
                Product.deleteOne({ name: name })
                    .then(() => {
                        res.json({
                            message: "Product deleted successfully",
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            message: "Failed to delete product",
                            error: error.message,
                        });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "An error occurred while checking for product existence.",
                error: error.message,
            });
        });
}

export function getProductsByName(req, res) {
    const name = req.params.name;

    Product.find({ name: name })
        .then((productList) => {
            if (productList.length === 0) {
                res.status(404).json({
                    message: "Product not found",
                });
            } else {
                res.json({
                    list: productList,
                }); 
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "An error occurred while fetching the product list.",
                error: error.message,
            });
        });
}

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true,
        unique: true,
    },
    productName: {
        type: String,
        required: true,
    },
    altNames: [
        {
            type: String,
        },
    ],
    images: [
        {
            type: String, // Corrected the casing of "string" to "String"
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    lastPrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    description: {
        type: String, // Corrected spelling of "descrption" to "description"
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema); // Singular model name for consistency
export default Product;//waste arround 2hrs to find this fucking error

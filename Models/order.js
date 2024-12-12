import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    orderItems: [
        {
            productID: {
                type: String,
                required: true,
            },
            productName: {
                type: String 
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number,
                required: true,
            },
            Image: {
                type: String
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
    paymentID: {
        type: String,
    },
    status: {
        type: String,
        default: "preparing",
    },
    notes: {
        type: String,
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;

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
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            Image: {
                type: String,
                required: true,
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
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;

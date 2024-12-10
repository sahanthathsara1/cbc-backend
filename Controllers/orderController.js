import Order from "../Models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {
    if (!isCustomer(req)) {
        return res.status(403).json({ message: "Login as a customer to place an order" });
    }

    try {
        // Find the most recent order
        const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

        let orderID;

        if (latestOrder.length === 0) {
            orderID = "CBC0001"; // Corrected to include quotes
        } else {
            const currentOrderID = latestOrder[0].orderID;
            const numberString = currentOrderID.replace("CBC", "");
            const number = parseInt(numberString, 10); // Ensure proper parsing with base 10

            const newNumber = (number + 1).toString().padStart(4, "0");

            orderID = "CBC" + newNumber;
        }

        // Ensure the request body is valid
        const newOrderData = req.body;
        if (!newOrderData || Object.keys(newOrderData).length === 0) {
            return res.status(400).json({ message: "Order data is required" });
        }

        // Add `orderID` and `email` to the order data
        newOrderData.orderID = orderID;
        newOrderData.email = req.user.email;

        const newOrder = new Order(newOrderData);

        // Save the new order
        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", orderID });
    } catch (error) {
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
}



export async function getOrders(req, res) {
    try {
        // Ensure the user is logged in
        if (!req.user || !req.user.email) {
            return res.status(401).json({ message: "Unauthorized access. Please log in." });
        }

        // Fetch orders for the logged-in user
        const orders = await Order.find({ email: req.user.email });

        // Check if orders are found
        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        // Return the orders
        res.status(200).json(orders);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
}

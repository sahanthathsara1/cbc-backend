import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";


import userRouter from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";
import orderRouter from "./Routes/orderRouter.js";


dotenv.config();

const app = express();
const PORT = 3000;
const mongourl = process.env.MONGO_DB_URI;

// Connect to MongoDB
mongoose
    .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// JWT Authentication Middleware
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded; // Attach decoded token to request
        });
    } else {
        req.user = null; // Explicitly set req.user to null if no token
    }
    next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders",orderRouter)

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

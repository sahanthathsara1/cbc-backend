import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRouter from './Routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const mongourl = process.env.MONGO_DB_URI;

// Improved mongoose connection with error handling
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error:", err));

const PORT = 3000;

app.use(bodyParser.json());

// Middleware to verify JWT tokens and attach user info to `req`
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);
    
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }
            req.user = decoded;
            console.log(decoded); // Attach decoded token to request
        });
    }
    next();
});

// User routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

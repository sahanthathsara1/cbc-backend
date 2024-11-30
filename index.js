import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import Student from './Models/student';
import studentRouter from './Routes/studentRouter.js';
import productRouter from './Routes/productRouter.js';
import userRouter from './Routes/userRouter.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const mongourl = process.env.MONGO_DB_URI;

mongoose.connect(mongourl,{});

const connection = mongoose.connection;

connection.once("open",() => {
    console.log("db connected");
});


const PORT = 3000;


app.use(bodyParser.json());


app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    console.log(token);

    if (token != null) {
        jwt.verify(token, "cbc-secret-key-7973", (err, decoded) => {
            if (!err) {
                console.log(decoded);
                req.user = decoded;
            }
        });
    }
    next();
});



app.use("/api/students",studentRouter);
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);



app.listen(PORT, () => {
    console.log(` this is listening on port ${PORT}`);
});

import express from 'express';
import { createUser, loginUser, deleteUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser); // Route to create user
userRouter.post("/login", loginUser); // Route to login user
userRouter.delete("/", deleteUser); // Route to delete user

export default userRouter;

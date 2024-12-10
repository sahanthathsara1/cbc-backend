import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createUser(req, res) {
    const newUserData = req.body;

    if (newUserData.type === "admin") {
        if (!req.user || req.user.type !== "admin") {
            return res.status(403).json({ message: "Unauthorized: Admin access required" });
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);

    user.save()
        .then(() => {
            res.status(201).json({ message: "User created successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to create user", error: error.message });
        });
}

export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (isPasswordCorrect) {
                const token = jwt.sign(
                    { id: user._id, email: user.email, type: user.type },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" }
                );

                res.status(200).json({ message: "Logged in successfully", token });
            } else {
                res.status(401).json({ message: "Incorrect password" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error", error: error.message });
        });
}

export function deleteUser(req, res) {
    const { email } = req.body;

    User.deleteOne({ email })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed to delete user", error: error.message });
        });
}

export function isAdmin(req) {
    return req.user?.type === "admin";
}
export function isCustomer(req) {
    return req.user?.type === "customer";
}



//"email": "admin@example.com" "password": "securepassword123" => admin account,
//  "email": "cutomer@example.com", "password": "securepassword123", => customer account

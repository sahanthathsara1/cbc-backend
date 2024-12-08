import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Controller to create a user
export function createUser(req, res) {
    const newUserData = req.body;
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);

    user.save()
        .then(() => {
            res.status(201).json({ message: "User created" });
        })
        .catch((error) => {
            res.status(500).json({ message: "User not created", error: error.message });
        });
}

// Controller to login a user
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
                    {
                        id: user._id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: "1h" } // Optional: Token expiration
                );

                return res.status(200).json({ message: "Logged in", token });
            } else {
                return res.status(401).json({ message: "Incorrect password" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error", error: error.message });
        });
}

// Controller to delete a user
export function deleteUser(req, res) {
    const { email } = req.body;

    User.deleteOne({ email })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted" });
        })
        .catch((error) => {
            res.status(500).json({ message: "User not deleted", error: error.message });
        });
}

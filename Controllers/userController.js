import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {

    const newUserData =req.body;
    newUserData.password = bcrypt.hashSync(newUserData.password,10);
      
   
    
    const user = new User(newUserData);


    
    user.save().then(() => {
        res.json({
            message : "User created"
        })

    }).catch(() => {
        res.status(500).json({
              Message: "user not created"      
        });
    });

}

export function loginUser(req, res) {
    User.find({ email: req.body.email })
        .then((users) => {
            if (users.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = users[0];
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
            
            if (isPasswordCorrect) {
                
                const token = jwt.sign({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilepicture: user.profilepicture
                }, "cbc-secret-key-7973");
                
                res.json({
                    message: "loggedin",
                    token: token
                });



            } else {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        });
} 
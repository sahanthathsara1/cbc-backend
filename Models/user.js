import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  isBlocked:{
    type: Boolean,
    default: false

  },
  type:{
    type: String,
    default: "customer"
  },
  profilepicture:{
     type: String,
     default: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  }
})
const User = mongoose.model("users",userSchema);
export default User;
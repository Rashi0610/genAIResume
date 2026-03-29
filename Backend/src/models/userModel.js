import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : [true,"Username already taken"]
    },
    email:{
        type : String,
        required : true,
        unique : [true,"User with this Email already exists"]
    },
    password:{
        type : String,
        required : true,
    },

})

export default mongoose.model("user",userSchema);

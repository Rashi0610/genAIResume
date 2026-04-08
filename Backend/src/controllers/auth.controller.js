import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import blackListModel from "../models/blackListModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @name registerUser
 * @description Registers a new user , expects name,email and password in the body
 * @access public
 */
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json("All Feilds Mandatory");
    return;
  }
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    if (existingUser.username == username) {
      return res.status(400).json("Username already taken");
    } else {
      return res.status(400).json("User with this email already exists");
    }
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newuser = await userModel.create({
    username,
    email,
    password: hashedpassword,
  });

  const token = jwt.sign(
    {
      id: newuser._id,
      username: newuser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
 

  res.status(201).json({
    message: "New user registered",
    token,
    user: {
      id: newuser._id,
      username: newuser.username,
      email: newuser.email,
    },
  });
});

/**
 * @name login
 * @description logs in an existing user , expects email and password in the body
 * @access public
 */

export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("ALL FEILDS MANDATORY!!");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json("User with this email not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json("Ivalid password");
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
    
  );

 


  res.status(201).json({
    message: "User logged in",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      
    },
    token,
  });
});


/**
 * @name logout
 * @description logout a user and blacklist the token
 * @access public
 */

export const logout = expressAsyncHandler(async(req,res)=>{
    const token = req.cookies.token;
    if(token){
        const blacklistedToken = await blackListModel.create({token});
        res.clearCookie("token")
    }
    res.status(200).json("User Logged out succesfully");
})


/**
 * @name getUserProfile
 * @description Fetches User profile
 * @access private
 */

export const getUserProfile = expressAsyncHandler(async(req,res)=>{
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        username:user.username,
        id:user._id,
        email:user.email
    })
})
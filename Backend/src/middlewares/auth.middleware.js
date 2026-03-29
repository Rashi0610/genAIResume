import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"
import blackListModel from "../models/blackListModel.js";

export const validatetoken = expressAsyncHandler(async(req,res)=>{
    const token = req.cookies.token;

    if(!token){
        return res.status(400).json("Token not sent!");

    }
    const isTokenBlacklisted = await blackListModel.findOne({token});
    if(isTokenBlacklisted){
        return res.status(401).json("Token is invalid!");
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch(error){
        res.status(401).json("Unauthorized");
    }
})
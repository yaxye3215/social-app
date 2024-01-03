import { JWT_SECRET } from "../config/config.js";
import User from "../models/User.js";
import  Jwt  from "jsonwebtoken";

export const createUser = async (req, res) => {
   
    try {
        const {name, email, password} = req.body;

    const userExists = await User.findOne({email});
   if (userExists) {
       return res.status(400).json({message: "User already exists"});
   }
    
    const user = await User({
        name: name,
        email: email,
        password: password
    });

    await user.save();
    return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
}

export const loginUser = async (req, res) => {
   
    try {
        const {email, password} = req.body;

    const userExists = await User.findOne({email}).select("+password");
   if (!userExists) {
       return res.status(400).json({message: "invalid email"});
   }
   const isCorrectPassword = await userExists.comparePassword(password);
   if (!isCorrectPassword) {
       return res.status(400).json({message: "password is incorrect"});
    
   }
   
   const Token = Jwt.sign({_id: userExists._id},JWT_SECRET)
  
    return res.status(200).json({...userExists.toJSON(), Token});

    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
}
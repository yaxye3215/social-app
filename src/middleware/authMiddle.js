import Jwt  from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";




export const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    // console.log(`token: ${token}`);
    if (token) {
      token = token.split(" ")[1];
      const decoded = Jwt.verify(token, JWT_SECRET);
      req.user = decoded
        next()
    }else{
        return res.status(400).json({message: "unauthorized user"});
    }


  } catch (error) {
    console.log(error);
  }
}
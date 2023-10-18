import { errorHandler } from "./error.js";
import JWT from 'jsonwebtoken'

export const userVerify=async(req,res,next)=>{
    
    const token = req.cookies.accesToken;
    
    if(!token) return next(errorHandler(401,"User not Authorized"))

    JWT.verify(token ,process.env.JWT_TOKEN ,(err,user)=>{
        if(err) return next(errorHandler(403,"uncot Error"));
        
        req.user = user;
        next();
    });
}
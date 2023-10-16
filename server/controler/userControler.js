import { errorHandler } from "../util/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/usermodel.js'

export const test = (req,res)=>{
    res.json({
        message:"text it now"
    });
}
export const updateUser =async(req,res,next)=>{
 
    if(req.user.id !== req.params.id) return next(errorHandler(401,"You can Only update in your account"));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password ,10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                avtar:req.body.avtar,
            }
        },{new:true})
        const {password ,...rest}=updateUser._doc;
       
        res.status(200).json({
            rest,
            message:"User Updated Succesfully"
        });
    } catch (error) {
        next(error)
    }
}
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
                username:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                avtar:req.body.avatar,
            }
        },{new:true})
        const {password ,...rest}=updateUser._doc;
       
        res.json({
            rest,
            success:true,
            message:"User Updated Succesfully"
        }).status(200);
    } catch (error) {
        next(error)
    }
}

export const signOut=async(req,res,next)=>{
    try {
        res.clearCookie('accesToken');
        res.json({
            message:'User has ban loged Out!!'
        }).status(200)
    } catch (error) {
        next(error)
    }}

export const userDelete =async(req,res,next)=>{
    try {
        if(req.user.id!==req.params.id){
            return next(errorHandler(401,"can only delete you on account"))
        }
        await User.findByIdAndDelete(req.params.id) 
        res.json("User deleted").status(200).clearCookie('accessToken')
    } catch (error) {
        next(error)
    }
}

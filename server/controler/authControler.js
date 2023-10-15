import User from '../models/usermodel.js';
import bcryptjs from 'bcryptjs';
import JWT  from 'jsonwebtoken'
import { errorHandler } from '../util/error.js';


export const signUp = async(req,res,next)=>{
    
    try {
        const {username ,email,phone,password} = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email },{phone}] });
        if (existingUser) {
            console.log("user exist");
            return res.status(200).json({
            success: false,
            message: 'Username or email or Phone no is already taken',
          });
        }else{
        const hashPassowrd = bcryptjs.hashSync(password,10);
        const newUser =new User({username,email,phone,password:hashPassowrd})
        await newUser.save();
            res.status(201).json({
            success:true,
            message:"User created Succesfully"
        }) 
    }
    } catch (error) {
        next(error)
    }

};

export const signIn=async(req,res,next)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                success:false,
                message:"Password or Username not matched!!"
            }).status(404)
        }
        const matchPassword = await bcryptjs.compare(password,user.password)
        if(!matchPassword){
            return res.json({
                success:false,
                message:"Password or Username not matched!!"
            }).status(401)
        }
    
        const token = JWT.sign({id:user._id},process.env.JWT_TOKEN)
        const {password:pass, ...rest}=user._doc;
        res.cookie('accesToken',token,{httpOnly:true})
        .status(200).json({
            success:true,
            message:"Signin Succesfull",
            rest
        });
    } catch (error) {
        next(error)
    }


}
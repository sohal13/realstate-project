import User from '../models/usermodel.js';
import bcryptjs from 'bcryptjs';
import JWT  from 'jsonwebtoken'
import { errorHandler } from '../util/error.js';


export const signUp = async(req,res,next)=>{
    
    try {
        const {username ,email,phone,password} = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
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
    
        const token = JWT.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:'100 years'})
        const {password:pass, ...rest}=user._doc;
        res.cookie('accesToken',token,{httpOnly:true,expires:new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
        .status(200).json({
            success:true,
            message:"Signin Succesfull",
            rest
        });
    } catch (error) {
        next(error)
    }


}

export const google = async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if (user) {
            const token = JWT.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:'100 years'})
            const {password:pass, ...rest}=user._doc;
            res.cookie('accesToken',token,{httpOnly:true,expires:new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000)})
            .json({
                rest
            }).status(200);
        }else{
            const genPassword = Math.random().toString(36).slice(-8);
            const hashPassowrd = bcryptjs.hashSync(genPassword,10);
            const newUser =new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),
                email:req.body.email,password:hashPassowrd,avtar:req.body.photo})
                await newUser.save();
                const token = JWT.sign({id:newUser._id},process.env.JWT_TOKEN,{expiresIn:'100 years'})
                const {password:pass, ...rest}=newUser._doc;
                res.cookie('accesToken',token,{httpOnly:true,expires:new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000) })
                .json({
                    rest
                }).status(200);  

        }
    } catch (error) {
        next(error)
    }
}
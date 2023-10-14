import User from '../models/usermodel.js';
import bcryptjs from 'bcryptjs';


export const signUp = async(req,res)=>{
    const {username ,email,phone,password} = req.body;
    
    const hashPassowrd = bcryptjs.hashSync(password,10);
    
    const newUser = new User({username,email,phone,password:hashPassowrd})
    try {
        await newUser.save()
        res.status(201).json({
            msg:"User created Succesfully"
        }) 
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
  
};
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    phone:{
        type:Number,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    avtar:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;
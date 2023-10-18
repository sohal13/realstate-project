import mongoose from "mongoose";

const userListing = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    discountprice:{
        type:Number,
    },
    area:{
        type:Number,
        required: true,
    },
    offer:{
        type:Boolean,
    required: true,
    },
    image:{
        type:Array,
        required: true,
    },
    userRef:{
        type:String,
        rrequired: true,
    },
},{timestamps:true})


const Listing = mongoose.model('listing',userListing);

export default Listing;
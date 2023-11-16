import Listing from "../models/listingmodel.js";
import { errorHandler } from "../util/error.js";
import User from '../models/usermodel.js'
export const createListing = async(req,res,next)=>{

    try {
        const listing = await Listing.create(req.body);
        return res.json({listing,
        message:"Your Property is Listed"}).status(201)
    } catch (error) {
        next(error);
    }
}

export const deleteListing =async(req,res,next)=>{
    try {
        const listing = await Listing.findById(req.params.id);
        if(!listing) return next(errorHandler(401,"Listing not found"))
    
        if(req.user.id !== listing.userRef){
            return next(errorHandler(401,"you can Only delete you listing"))
        }
        await Listing.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"Your Listing is Deleted"
        }).status(200)

    } catch (error) {
        next(error)
    }
}

export const singleListing = async(req,res,next)=>{
try{
    const singleListidata = await Listing.findById(req.params.id);
    if(!singleListidata) return next(errorHandler(401,"Listing not found"))

    res.json(singleListidata).status(200)
    } catch (error) {
        next(error)
    }
}

export const contactLandLord = async(req,res,next)=>{
    try {
        const singleListidata = await Listing.findById(req.params.id);
        if(!singleListidata) return next(errorHandler(401,"Listing not found"))
        
        const user = await User.findById(singleListidata.userRef);
        const {username , email , phone } = user;
        const userData = {username , email , phone }
        res.json(userData).status(200);
    } catch (error) {
        next(error)
    }
}

export const editsinglelisting=async(req,res,next)=>{
try {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(401,"Listing not found"))
        if(req.user.id !== listing.userRef){
            return res.next(errorHandler(401,"you can Only Update you listing"))
        }
       const updatedListing =  await Listing.findByIdAndUpdate(
        req.params.id,
        req.body
       ,{new:true})
        res.json({
            message:"succesfully updated",
            success:true,
            updatedListing
        }).status(200)
} catch (error) {
    next(error)
}
}

export const searchLand=async(req,res,next)=>{
try {

    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const search = req.query.search || '';
    const listing = await Listing.find({
        $or:[
    {name:{$regex:'.*'+search+'.*',$options:'i'}},
    {address:{$regex:'.*'+search+'.*',$options:'i'}},
        ]
    }).limit(limit).skip(startIndex);

   
    res.status(200).json(listing);


} catch (error) {
    next(error);
}
}

export const landData=async(req,res,next)=>{
    try {
    
        const limit = parseInt(req.query.limit) || 4;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const listing = await Listing.find()
        .limit(limit).skip(startIndex);
    
        res.status(200).json(listing);
    
    
    } catch (error) {
        next(error);
    }
    }
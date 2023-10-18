import Listing from "../models/listingmodel.js";

export const createListing = async(req,res,next)=>{

    try {
        const listing = await Listing.create(req.body);
        return res.json({listing,
        message:"Your Property is Listed"}).status(201)
    } catch (error) {
        next(error);
    }
}
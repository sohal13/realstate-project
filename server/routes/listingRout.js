import express from 'express'
import { contactLandLord, createListing, deleteListing, editsinglelisting, landData, searchLand, singleListing } from '../controler/listingControler.js';
import { userVerify } from '../util/verifyUser.js';
const router = express.Router();

router.post('/createlisting' ,userVerify ,createListing)
router.delete('/deletelisting/:id' ,userVerify ,deleteListing)
router.get('/singlelist/:id' ,singleListing)
router.get('/contactLandLord/:id',contactLandLord)
router.post('/editsinglelisting/:id' ,userVerify ,editsinglelisting)
router.get('/search',searchLand) 
router.get('/get',landData) 



export default router
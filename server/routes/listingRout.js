import express from 'express'
import { createListing } from '../controler/listingControler.js';
import { userVerify } from '../util/verifyUser.js';
const router = express.Router();

router.post('/createlisting' ,userVerify ,createListing)


export default router
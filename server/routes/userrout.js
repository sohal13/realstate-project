import express from 'express'
import {test, updateUser} from '../controler/userControler.js'
import { userVerify } from '../util/verifyUser.js';

const router = express.Router();

router.get('/text', test);

router.post('/update/:id',userVerify, updateUser );



export default router;
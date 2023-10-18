import express from 'express'
import {signOut, test, updateUser, userDelete} from '../controler/userControler.js'
import { userVerify } from '../util/verifyUser.js';

const router = express.Router();

router.get('/text', test);

router.post('/update/:id',userVerify, updateUser );

router.get('/signout',signOut)

router.delete('/deleteuser/:id',userVerify ,userDelete)




export default router;
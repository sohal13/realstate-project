import express from 'express'
import {test} from '../controler/userControler.js'

const router = express.Router();


router.get('/text', test);


export default router;
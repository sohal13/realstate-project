import express from 'express'
import { signUp } from '../controler/authControler.js';

const router = express.Router();

router.post('/signup',signUp)

export default router;
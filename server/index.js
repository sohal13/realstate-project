import express from "express";
import dotenv from 'dotenv'

dotenv.config({path:"server/index.js"});

const app = express()



const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server working at ${PORT}`);
})
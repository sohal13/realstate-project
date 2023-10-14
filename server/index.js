import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./routes/userrout.js";

dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DataBase is Now Connected");
}).catch((err)=>{
    console.log(err);
})

const app = express()


app.use('/api/user',userRouter)


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server working at ${PORT}`);
})

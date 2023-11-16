import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./routes/userrout.js";
import authRouter from "./routes/authRout.js";
import listingRouter from './routes/listingRout.js'
import cookieParser from "cookie-parser";
import path from 'path';


dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DataBase is Now Connected");
}).catch((err)=>{
    console.log(err);
})


const __dirname = path.resolve();

const app = express()

app.use(express.json());

app.use(cookieParser());
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)

const staticPath= path.join(__dirname,'/client/dist');

app.use(express.static(staticPath));
  

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","dist","index.html"))
})
 



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
})



const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server working at ${PORT}`);
})

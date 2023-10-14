import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./routes/userrout.js";
import authRouter from "./routes/authRout.js"

dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DataBase is Now Connected");
}).catch((err)=>{
    console.log(err);
})

const app = express()

app.use(express.json());


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)



const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server working at ${PORT}`);
})

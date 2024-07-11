import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js'
import packageRouter from './routes/package.routes.js'
import otpRoutes from './routes/otp.routes.js'
import cors from 'cors'
const app=express();
//app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config({ path: "../.env" });
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use('/auth',authRouter);
app.use('/package',packageRouter);
app.use('/otp',otpRoutes)
const connectToMongoose = async() => { 
    try{
        //console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`Mongo_Database is Connected !, ${mongoose.connection.host}`) ; 
        }).catch((err) => {
            console.log(err.message) ;
        })
    }catch(error){
        console.log(`Error connecting to MONGO_DB!`, error.message) ;
    }
}
app.get("/",(req,res)=>{
    res.send("welcome to package manager")
})
app.listen(8080,()=>{
    console.log('server listening on port 8080')
    connectToMongoose();
})

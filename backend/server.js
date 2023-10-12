import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
const port=process.env.PORT||5000;
import userRoute from './routes/userRoute.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import adminRouter from './routes/adminRoute.js';
connectDB()


const app=express()
app.use(cors({
  origin: 'http://localhost:3000', // Update the origin to match your React app's origin
  methods: 'GET,PUT,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/users",userRoute)
app.use("/api/users/admin",adminRouter)


app.get('/',(req,res)=>{
    res.send("server is ready")
})

app.listen(port,()=>console.log(`server connected port ${port}`))
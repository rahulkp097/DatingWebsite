import jwt from 'jsonwebtoken'
import userModel from '../models/userModels.js';


const protect=async(req,res,next)=>{

    let token=await req.cookies.userJwt
   
 
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            
            req.user=await userModel.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401).json({authorized:false,message:"Not authorized invalid token"})
        }
    }else{
     res.status(401).json({authorized:false,message:"Not authorized, no token"})
        
    }
} 


export {protect}
import jwt from 'jsonwebtoken'
import userModel from '../models/userModels.js';


const protect=async(req,res,next)=>{

    let token=req.cookies.jwt
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            console.log('decorded',decoded)
            req.user=await userModel.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error ('not authorized invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token')
    }
}


export {protect}
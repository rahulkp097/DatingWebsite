import userModel from "../models/userModels.js"
import generateToken from "../utils/generateToken.js"
import dotenv from 'dotenv'
dotenv.config()

const adminLogin=(req,res)=>{

    try {
        const{email,password}=req.body
        console.log("UserInfo from admin",typeof email,password)
        console.log("UserInfo from admin1", process.env.AdminUsername,process.env.AdminPassword)

        
        if(email==process.env.AdminUsername && password === process.env.AdminPassword){
           console.log("inside the function")
            res.status(200).json({message:"login sucesss"})
        }else{
            res.json({message:"Invalid email or password"})
        }
        
    } catch (error) {
        res.json({message:"server Issue"})
    }
}


const getUserData = async (req, res) => {
    try {
        const users = await userModel.find();
     
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "server issue" });
    }
}




const adminLogout=(req,res)=>{
    res.cookie('jwt',"",{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({mesasge:'logout sucessfully'})
}



export{
    adminLogin,
    getUserData,
    adminLogout
}
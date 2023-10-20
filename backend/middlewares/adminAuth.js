import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()



const adminAuthProtect = async (req, res, next) => {
    try {
        const token = req.cookies.adminjwt
     
      if (token) {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded.userId;
        next();
      } else {
        res.status(401).json({valid:false, message: "Not authorized, no token" });
      }
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  };


  export {
    adminAuthProtect
  }
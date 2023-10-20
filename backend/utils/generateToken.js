import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    console.log("user token",token)

    res.cookie("userJwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
};


const generateAdminToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
        
    console.log('Generated Admin Token:', token); // Log the generated token
    res.cookie("adminjwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
  
  };
  
  

export default generateToken;
export { generateAdminToken };
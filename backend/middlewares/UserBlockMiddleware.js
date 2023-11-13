import userModel from '../models/userModels.js';
import jwt from 'jsonwebtoken'



const ActiveUser = async (req, res, next) => {
  let token=await req.cookies.userJwt

  try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     const user=await userModel.findById(decoded.userId).select('-password')

    if (user.isActive) {
      
      next();
    } else {
        req.session.destroy();

        res.clearCookie("userJwt");
           return res.status(403).json({ user, notActive: true, message: "User has been blocked by admin" });
    }
  } catch (error) {
 
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { ActiveUser };


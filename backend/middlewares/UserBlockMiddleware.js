import userModel from '../models/userModels.js';




const ActiveUser = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    const user = await userModel.findById(userId).select("-password");

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


import userModel from "../models/userModels.js";
import dotenv from "dotenv";
import { generateAdminToken } from "../utils/generateToken.js";
dotenv.config();

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email == process.env.AdminUsername &&
      password === process.env.AdminPassword) {
        
         generateAdminToken(res, email);

      res.status(200).json({ success:true, message: "login sucesss" });
    } else {
      res.json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ message: "server Issue" });
  }
};

const getUserData = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "server issue" });
  }
};

const userAction = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await userModel.findById(userId);

    if (user) {
      const updatedIsActive = !user.isActive; // Toggle the isActive status
      user.isActive = updatedIsActive;

      await user.save();

      res
        .status(200)
        .json({
          success: true,
          message: "User updated successfully",
          isActive: updatedIsActive,
        });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const adminLogout = (req, res) => {
    // Clear the 'jwt' cookie
    res.clearCookie('adminjwt');
    
    res.status(200).json({ message: 'logout successfully' });
  };
  

export { adminLogin, getUserData, adminLogout, userAction };

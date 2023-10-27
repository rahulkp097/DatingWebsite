import userModel from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cloudinary from "../helper/imageUploader.js";
dotenv.config();
let storedOTP;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      if (user.isActive === false) {
        return res.json({
          notActive: true,
          message: "Your account has been blocked by admin",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        generateToken(res, user._id);

        req.session.userLogin = true;
        req.session.userId = user._id;
        req.session.username = user.name;
        req.session.email = user.email;

        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(401).json({
          message: "Invalid username or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const registerUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    } else {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      storedOTP = otp;

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.nodeMailerUserName,
          pass: process.env.nodeMailerPassword,
        },
      });

      const mailOptions = {
        from: "riofashionstoreeco@gmail.com",
        to: email,
        subject: "Account Verification",
        text: `Hi, ${name}, Thank you for Choosing You&Me. Please enter the OTP to verify your account, 
          OTP :${otp}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Something went wrong. Please try again",
            });
        } else {
          return res.status(200).json({ success: true, message: "OTP sent" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const verifyOTP = (req, res) => {
  const { name, email, password, enteredOTP, gender } = req.body;

  if (storedOTP === enteredOTP) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Failed to hash the password" });
      }

      // Create a new user with the hashed password
      const newUser = userModel.create({
        name,
        email,
        password: hashedPassword,
        gender,
        createdAt: Date.now(),
      });

      newUser
        .then((user) => {
          return res.status(200).json({ success: true, user });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Failed to create user" });
        });
    });
  } else {
    return res.status(200).json({ success: false, message: "Incorrect OTP" });
  }
};

const uploadPhoto = async (req, res) => {
  const { userId, imageUrl } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.image = imageUrl;

    await user.save();

    return res
      .status(200)
      .json({
        user,
        success: true,
        message: "Image uploaded and user data updated",
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfile = async (req, res) => {
  const { name, age, bio, userInfo, location } = req.body;

  try {
    const user = await userModel.findById(userInfo._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) {
      user.name = name;
    }

    if (age) {
      user.age = age;
    }

    if (bio) {
      user.bio = bio;
    }

    if (location) {
      user.location = location;
    }

    await user.save();

    return res
      .status(200)
      .json({
        user: user,
        success: true,
        message: "Profile updated successfully",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = (req, res) => {
  const userId = req.params.userId;

  try {
    const user = userModel.findById(userId);

    if (user.isActive) {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, mesasge: "Internal server Error" });
  }
};

const userLogout = (req, res) => {
  req.session.destroy();

  res.clearCookie("userJwt");

  res.status(200).json({ success: true, mesasge: "logout sucessfully" });
};

const resestPassword = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.nodeMailerUserName,
          pass: process.env.nodeMailerPassword,
        },
      });

      const mailOptions = {
        from: "riofashionstoreeco@gmail.com",
        to: email,
        subject: "Reset password Request",
        text: `Hi, ${user.name}, Thank you for Choosing You&Me. We have received your reset password request 
            Please visit this link to reset your password, 
        Link :http://localhost:3000/enterpassword?email=${email}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Something went wrong. Please try again",
            });
        } else {
          return res.status(200).json({ success: true, message: "OTP sent" });
        }
      });
    }
  } catch (error) {}
};

const confirmPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Password hashing error: " + err.message,
        });
        return;
      }

      const user = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } },
        { new: true }
      );

      if (user) {
        res.status(200).json({
          success: true,
          message:
            "Password has been changed. Please login with your new password.",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User not found or password not updated.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

const getHome = async (req, res) => {
  const userId = req.query.Id;

  if (userId) {
    try {
      const allUsers = await userModel.find({ isActive: true });
      
      const currentUser = await userModel.findById(userId);
      const sortedUsers = allUsers.filter((user) => user._id != userId && !currentUser.matches.includes(user._id));

      res.status(200).json({ success: true, sortedUsers });
    } catch (error) {
      res.status(500).json({ mesasge: "An error occurred: " + error.message });
    }
  } else {
    res.status(400).json({ mesasge: "UserId is not defined" });
  }
};


const sendinterest= async(req,res)=>{

const userId=req.body.userId
const targetId=req.body.targetId


try {
  
  const sendUser=await userModel.findById(userId)

  sendUser.interestSend.push(targetId)
  await sendUser.save()
  
  
  const targetUser=await userModel.findById(targetId)
  
  targetUser.interestReceived.push(userId)
  
  await targetUser.save()

      return res.status(200).json({user:sendUser, success:true, message: 'Interest sent successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  const cancelInterest = async (req, res) => {
    const userId = req.body.userId;
    const targetId = req.body.targetId;
  
    try {
     
      const sendingUser = await userModel.findById(userId);
  
      if (!sendingUser) {
        return res.status(404).json({ message: 'Sending user not found' });
      }
  
     
      const targetUser = await userModel.findById(targetId);
  
      if (!targetUser) {
        return res.status(404).json({ message: 'Receiving user not found' });
      }
  
      
      sendingUser.interestSend = sendingUser.interestSend.filter((e) => e.toString() !== targetId.toString());
      await sendingUser.save();
  
     
      targetUser.interestReceived = targetUser.interestReceived.filter((e) => e.toString() !== userId.toString());
      await targetUser.save();
  
      return res.status(200).json({ user:sendingUser, success: true, message: 'Interest request canceled' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


  const getInterestsList = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const interestReceivedPromises = user.interestReceived.map(async (interestUserId) => {
        const interestUser = await userModel.findById(interestUserId).select('name email age bio image location gender');
        return interestUser;
      });
  
      const interestSendPromises = user.interestSend.map(async (interestUserId) => {
        const interestUser = await userModel.findById(interestUserId).select('name email age bio image location gender');
        return interestUser;
      });
  
      const [interestReceived, interestSend] = await Promise.all([
        Promise.all(interestReceivedPromises),
        Promise.all(interestSendPromises),
      ]);
  
      res.status(200).json({
        success: true,
        interestReceived,
        interestSend,
      });
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

  const acceptInterest = async (req, res) => {
    try {
      const userId = req.body.userId;
      const targetId = req.body.targetId;
  
      
      const user = await userModel.findById(userId);
      
  

  
      
      user.matches.push(targetId);
      
      
      user.interestReceived = user.interestReceived.filter((id) => id !== targetId);
  
      
      await user.save();

      const targetUser = await userModel.findById(targetId);

      targetUser.matches.push(userId);

      targetUser.interestSend = targetUser.interestSend.filter((id) => id !== userId);
  
      await targetUser.save();
  
      res.status(200).json({
        success: true,
        user: user,
        message: 'Interest request accepted',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


  const matchList= async(req,res)=>{

    
    try {
      const userId=req.params.Id
       
      const user=await userModel.findById(userId)
        res.status(200).json({success:true,user})
    } catch (error) {

      res.status(500).json({ success: false, message: 'Internal server error' });
  
    }
  }
  


export {
  login,
  updateProfile,
  registerUser,
  userLogout,
  verifyOTP,
  resestPassword,
  confirmPassword,
  getUserProfile,
  uploadPhoto,
  getHome,
  sendinterest,
  cancelInterest,
  getInterestsList,
  acceptInterest,
  matchList
};

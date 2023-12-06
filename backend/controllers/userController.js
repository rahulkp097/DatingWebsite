import userModel from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import SubscriptionModel from "../models/subscriptionModels.js";

import UserActivityModel from "../models/userActivityModels.js";
dotenv.config();

let storedOTP;

// function to send Email to user

const sendEmailMessage = async (recipientEmail, recipientName, message) => {
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
    to: recipientEmail,
    subject: "You&Me Message",
    text: `Hi, ${recipientName}, ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: ", info.response);
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// Function to generate a random password
function generateRandomPassword(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Function to Log user activity function
const logUserActivity = async (userId, activityType) => {
  try {
    const userActivity = new UserActivityModel({
      userId,
      activityType,
    });
    await userActivity.save();
  } catch (error) {
    console.error("Error logging user activity:", error);
  }
};

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
        await logUserActivity(user._id, "Login");
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
          return res.status(500).json({
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
          generateToken(res, user._id);
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

const uploadProfilePhoto = async (req, res) => {
  const { userId, imageUrl } = req.body;

  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.image = imageUrl;

    await user.save();
    await logUserActivity(userId, "Profile Photo updated");

    return res.status(200).json({
      user,
      success: true,
      message: "Image uploaded and user data updated",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateProfile = async (req, res) => {
  const {
    name,
    age,
    gender,
    bio,
    selectedHobbies,
    selectedOccupation,
    selectedQualification,
    userInfo,
    selectedCountry,
    selectedState,
    selectedCity,
    currentLocation,
  } = req.body;

  try {
    const user = await userModel.findById(userInfo._id).select("-password");

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
    if (gender) {
      user.gender = gender;
    }
    if (selectedQualification) {
      user.education = selectedQualification;
    }

    if (selectedOccupation) {
      user.occupation = selectedOccupation;
    }
    if (selectedHobbies) {
      user.hobbies = selectedHobbies;
    }

    if (selectedCountry) {
      user.country = selectedCountry;
    }

    if (selectedState) {
      user.state = selectedState;
    }

    if (selectedCity) {
      user.city = selectedCity;
    }
    if (currentLocation) {
      user.currentLocation = currentLocation;
    }

    await user.save();
    await logUserActivity(user._id, "Profile updated");
    return res.status(200).json({
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
    const user = userModel.findById(userId).select("-password");

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
        Link :https://youandmelove.me/enterpassword?email=${email}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).json({
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
        await logUserActivity(user._id, "Changed Password");
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
      const subscriptionPlans = await SubscriptionModel.find();
      const currentUser = await userModel
        .findById(userId)
        .populate("subscription.plan");

      const sortedUsers = allUsers.filter(
        (user) =>
          user._id != userId &&
          !currentUser.interestReceived.includes(user._id) &&
          !currentUser.matches.includes(user._id)
      );

      res
        .status(200)
        .json({ success: true, currentUser, sortedUsers, subscriptionPlans });
    } catch (error) {
      res.status(500).json({ mesasge: "An error occurred: " + error.message });
    }
  } else {
    res.status(400).json({ mesasge: "UserId is not defined" });
  }
};

const sendinterest = async (req, res) => {
  const userId = req.body.userId;
  const targetId = req.body.targetId;

  try {
    const sendUser = await userModel.findById(userId).select("-password");

    if (!sendUser.subscription || !sendUser.subscription.status) {
      return res.status(400).json({
        success: false,
        message: "You need to subscribe to a plan to send interests.",
      });
    }

    const currentPlan = await SubscriptionModel.findById(
      sendUser.subscription.plan
    );
    const maxAllowedInterests = currentPlan.maxInterests; // Adjust the field based on your subscription plan
    const currentInterestCount = sendUser.interestCount;

    if (maxAllowedInterests && currentInterestCount >= maxAllowedInterests) {
      return res.status(400).json({
        success: false,
        message:
          "You have reached the maximum allowed interests for your subscription plan.",
      });
    }
    sendUser.interestSend.push(targetId);
    sendUser.interestCount += 1;
    await sendUser.save();

    const targetUser = await userModel.findById(targetId);

    targetUser.interestReceived.push(userId);

    const recipientEmail = targetUser.email;
    const recipientName = targetUser.name;
    const message = `${sendUser.name} is interested on you Profile`;
    await sendEmailMessage(recipientEmail, recipientName, message);

    await targetUser.save();
    await logUserActivity(userId, "sent interest");
    return res.status(200).json({
      user: sendUser,
      success: true,
      message: "Interest sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cancelInterest = async (req, res) => {
  const userId = req.body.userId;
  const targetId = req.body.targetId;

  try {
    const sendingUser = await userModel.findById(userId).select("-password");

    if (!sendingUser) {
      return res.status(404).json({ message: "Sending user not found" });
    }

    const targetUser = await userModel.findById(targetId);

    if (!targetUser) {
      return res.status(404).json({ message: "Receiving user not found" });
    }

    sendingUser.interestSend = sendingUser.interestSend.filter(
      (e) => e.toString() !== targetId.toString()
    );
    await sendingUser.save();

    targetUser.interestReceived = targetUser.interestReceived.filter(
      (e) => e.toString() !== userId.toString()
    );
    await targetUser.save();

    return res.status(200).json({
      user: sendingUser,
      success: true,
      message: "Interest request canceled",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cancelReceivedInterest = async (req, res) => {
  const userId = req.body.userId;
  const targetId = req.body.targetId;

  try {
    const user = await userModel.findById(userId).select("-password");

    const targetUser = await userModel.findById(targetId);

    user.interestReceived = user.interestReceived.filter(
      (e) => e.toString() !== targetId.toString()
    );
    await user.save();

    targetUser.interestSend = targetUser.interestSend.filter(
      (e) => e.toString() !== userId.toString()
    );

    const recipientEmail = targetUser.email;
    const recipientName = targetUser.name;
    const message = `${user.name} has declined your Interest`;
    await sendEmailMessage(recipientEmail, recipientName, message);
    await targetUser.save();

    return res.status(200).json({
      user,
      success: true,
      message: "Interest request canceled",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getInterestsList = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findById(userId).select("-password");

    const interestReceivedPromises = user.interestReceived.map(
      async (interestUserId) => {
        const interestUser = await userModel
          .findById(interestUserId)
          .select("name email age bio image location gender");
        return interestUser;
      }
    );

    const interestSendPromises = user.interestSend.map(
      async (interestUserId) => {
        const interestUser = await userModel
          .findById(interestUserId)
          .select("name email age bio image location gender");
        return interestUser;
      }
    );

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
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const acceptInterest = async (req, res) => {
  try {
    const userId = req.body.userId;
    const targetId = req.body.targetId;

    const user = await userModel.findById(userId).select("-password");

    user.matches.push(targetId);

    user.interestReceived = user.interestReceived.filter(
      (id) => id.toString() !== targetId
    );

    await user.save();

    const targetUser = await userModel.findById(targetId);

    targetUser.matches.push(userId);

    targetUser.interestSend = targetUser.interestSend.filter(
      (id) => id.toString() !== userId
    );

    const recipientEmail = targetUser.email;
    const recipientName = targetUser.name;
    const message = `${user.name} has accepted your interest`;
    await sendEmailMessage(recipientEmail, recipientName, message);
    await targetUser.save();
    await logUserActivity(userId, "Interest Accepted");
    res.status(200).json({
      success: true,
      user: user,
      message: "Interest request accepted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const matchList = async (req, res) => {
  try {
    const userId = req.params.Id;

    const user = await userModel
      .findById(userId)
      .populate("matches") // Populate the 'matches' field with user details
      .select("-password");

    res.status(200).json({ success: true, matchList: user.matches });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const userId = req.body.userId;
    const targetId = req.body.targetId;

    const user = await userModel.findById(userId).populate("matches");

    const targetUser = await userModel.findById(targetId).populate("matches");

    targetUser.matches = targetUser.matches.filter(
      (match) => match._id.toString() !== userId
    );
    user.matches = user.matches.filter(
      (match) => match._id.toString() !== targetId
    );
    await targetUser.save();

    await user.save();

    res.status(200).json({
      success: true,
      matchList: user.matches,
      message: "Match deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getTargetUserProfile = async (req, res) => {
  const targetId = req.query.userId;
  const userId = req.query.user;

  try {
    const TargetUser = await userModel
      .findById(targetId)
      .populate("reports")
      .select("-password");
    const user = await userModel.findById(userId).select("-password");

    res.status(200).json({ success: true, data: TargetUser, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const googleAuthLogin = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    const user = await userModel.findOne({ email: email });

    if (user && user?.isActive) {
      req.session.userId = user._id;
      req.user = user;
      generateToken(res, user._id);
      await logUserActivity(user._id, "Login");
      return res.status(200).json({ success: true, user: user });
    }
    if (user && !user?.isActive) {
      return res.json({
        notActive: true,
        message: "Your account has been blocked by admin",
      });
    } else {
      const randomPassword = generateRandomPassword(8);

      const password = await bcrypt.hash(randomPassword, 10);
      const newUser = new userModel({
        email: email,
        name: name,
        image: image,
        password,
        createdAt: Date.now(),
      });

      const recipientEmail = newUser.email;
      const recipientName = newUser.name;
      const message = `Thank you for choosing You&Me! Your account has been successfully created. Welcome to our community. We're excited to have you on board! If you have any questions or need assistance, please don't hesitate to contact our support team. Enjoy your experience with You&Me!   YourPassword:${randomPassword}`;

      await sendEmailMessage(recipientEmail, recipientName, message);

      await newUser.save();
      req.session.userId = newUser._id;
      generateToken(res, newUser._id);

      res
        .status(200)
        .json({ success: true, message: "User created", user: newUser });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const showRecommendation = async (req, res) => {
  const userId = req.params.Id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userCity = user.city;

    const recommendations = await userModel.find({
      city: userCity,
      _id: { $ne: userId },
      matches: { $nin: [userId] },
    });

    return res.status(200).json({
      recommendations,
      success: true,
      message: "Recommendations retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addToShortList = async (req, res) => {
  const userId = req.body.user;
  const targetId = req.body.targetId;

  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user.subscription || !user.subscription.status) {
      return res.status(400).json({
        success: false,
        message: "You need to subscribe to a plan to shortlist.",
      });
    }

    const isAlreadyInShortlist = user.shortlist.includes(targetId);

    const currentPlan = await SubscriptionModel.findById(
      user.subscription.plan
    );
    const maxAllowedShortlists = currentPlan.maxShortlist;
    const currentShortlistCount = user.shortlistCount;

    if (isAlreadyInShortlist) {
      user.shortlist = user.shortlist.filter(
        (id) => id.toString() !== targetId
      );

      await user.save();
      return res
        .status(200)
        .json({ success: true, message: "User removed from shortlist", user });
    }

    if (maxAllowedShortlists && currentShortlistCount >= maxAllowedShortlists) {
      return res.json({
        success: false,
        message:
          "You have reached the maximum allowed shortlists for your subscription plan.",
      });
    } else {
      const targetUser = await userModel.findById(targetId);

      user.shortlist.push(targetId);
      const recipientEmail = targetUser.email;
      const recipientName = targetUser.name;
      const message = `Your profile has been shortlisted by ${user.name}`;
      await sendEmailMessage(recipientEmail, recipientName, message);
      user.shortlistCount += 1;
      await user.save();
      await logUserActivity(userId, "Added to Shortlist");
      return res
        .status(200)
        .json({ success: true, message: "User added to shortlist", user });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getShortlistProfiles = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel
      .findById(userId)
      .populate("shortlist")
      .select("-password");

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword, confirmPassword } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();
    await logUserActivity(userId, "Password updated");
    return res
      .status(200)
      .json({ success: true, user, message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscripctions = async (req, res, next) => {
  try {
    const userId = req.params.Id;

    const subscriptionList = await SubscriptionModel.find();
    const user = await userModel.findById(userId);

    res.status(200).json({ subscriptionList, user });
  } catch (error) {
    next(error);
  }
};

const pucharsesubscripction = async (req, res) => {
  try {
    const { planId, userId } = req.body;

    // Find the user by userId
    const user = await userModel.findById(userId);

    const subscriptionPlan = await SubscriptionModel.findById(planId);

    user.subscription.plan = subscriptionPlan._id;
    user.subscription.status = true;
    user.subscription.planName = subscriptionPlan.name;
    user.subscription.startDate = new Date();
    const today = new Date();
    user.subscription.expirationDate = new Date(
      today.setMonth(today.getMonth() + subscriptionPlan.duration)
    );

    await user.save();
    await logUserActivity(userId, "Subscription purchased");
    return res.status(200).json({
      user,
      success: true,
      message: "Subscription purchased successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while purchasing the subscription",
      error: error.message,
    });
  }
};

const reportUser = async (req, res, next) => {
  try {
    const { reason, userId, targetId } = req.body;

    const user = await userModel.findById(targetId);
    user.reports.push({ reporter: userId, reason, createdAt: new Date() });
    user.reportCount += 1;
    await logUserActivity(userId, `reported ${user.name}`);
    if (user.reportCount >= 5) {
      user.isActive = false;
    }

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User reported successfully" });
  } catch (error) {
    next(error);
  }
};

const uploadphotos = async (req, res, next) => {
  const { userId, imageUrl } = req.body;

  try {
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.photos.push(imageUrl);

    await user.save();
    await logUserActivity(userId, "new Photo uploaded Photo updated");

    return res.status(200).json({
      user,
      success: true,
      message: "Image uploaded and user data updated",
    });
  } catch (error) {
    next(error);
  }
};

const deletePhoto = async (req, res, next) => {
  try {
    const { userId, index } = req.body;

    const user = await userModel.findById(userId).select("-password");

    user.photos.splice(index, 1);

    user.save();
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const setAsProfilePhoto = async (req, res, next) => {
  try {
    const { userId, index } = req.body;

    const user = await userModel.findById(userId).select("-password");
    const profilephoto = user.photos[index];

    user.image = profilephoto;
    user.save();
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
export {
  login,
  updateProfile,
  registerUser,
  userLogout,
  verifyOTP,
  resestPassword,
  confirmPassword,
  getUserProfile,
  uploadProfilePhoto,
  getHome,
  sendinterest,
  cancelInterest,
  getInterestsList,
  acceptInterest,
  matchList,
  deleteMatch,
  getTargetUserProfile,
  googleAuthLogin,
  showRecommendation,
  addToShortList,
  getShortlistProfiles,
  cancelReceivedInterest,
  updateUserPassword,
  getSubscripctions,
  pucharsesubscripction,
  reportUser,
  uploadphotos,
  deletePhoto,
  setAsProfilePhoto,
};

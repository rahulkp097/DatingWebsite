import express from "express";
const router = express.Router();
import {
  verifyOTP,
  updateProfile,
  login,
  cancelInterest,
  registerUser,
  userLogout,
  resestPassword,
  confirmPassword,
  getUserProfile,
  uploadProfilePhoto,
  getHome,
  sendinterest,
  getInterestsList,
  acceptInterest,
  matchList,
  deleteMatch,
  getTargetUserProfile,
  googleAuthLogin,
  addToShortList,
  getShortlistProfiles,
  cancelReceivedInterest,
  updateUserPassword,
  getSubscripctions,
  pucharsesubscripction,
  reportUser,
  uploadphotos,
  setAsProfilePhoto,
  deletePhoto,
} from "../controllers/userController.js";
import { protect } from "../middlewares/userAuth.js";
import { ActiveUser } from "../middlewares/UserBlockMiddleware.js";

router.post("/login", login);
router.put("/profile", protect, updateProfile);
router.put("/profilephoto", protect, uploadProfilePhoto);
router.get("/profile", protect, getUserProfile);
router.get("/home", protect, ActiveUser, getHome);
router.post("/", registerUser);
router.post("/otp", verifyOTP);
router.post("/resestpassword", resestPassword);
router.post("/confirmpassword", confirmPassword);
router.post("/logout", userLogout);
router.post("/sendinterest", protect, sendinterest);
router.post("/cancelinterest", protect, cancelInterest);
router.post("/cancelreceivedinterest", protect, cancelReceivedInterest);
router.get("/interestslist/:id", protect, getInterestsList);
router.post("/acceptinterest", protect, acceptInterest);
router.get("/match/:Id", protect, matchList);
router.delete("/deletematch", protect, deleteMatch);
router.get("/userprofile", protect, getTargetUserProfile);
router.post("/googlelogin", googleAuthLogin);
router.post("/addshortlist", protect, addToShortList);
router.get("/shortlist/:userId", protect, getShortlistProfiles);
router.get("/subscriptions/:Id", protect, getSubscripctions);
router.put("/updatepassword",protect,updateUserPassword)
router.post("/pucharsesubscripction",protect,pucharsesubscripction)
router.post("/reportuser",protect,reportUser)
router.post("/uploadphotos",protect,uploadphotos)
router.put("/setasprofilephoto",protect,setAsProfilePhoto)
router.delete("/deletephoto",protect,deletePhoto)
 

export default router;

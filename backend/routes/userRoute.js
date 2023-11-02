import express from 'express'
const router=express.Router()
import  { verifyOTP, updateProfile, login,cancelInterest, registerUser, userLogout, resestPassword, confirmPassword, getUserProfile, uploadPhoto, getHome, sendinterest, getInterestsList, acceptInterest, matchList, deleteMatch, getTargetUserProfile, googleAuthLogin, addToShortList, getShortlistProfiles } from '../controllers/userController.js'
import { protect } from '../middlewares/userAuth.js'

router.post("/login",login)
router.post("/profile",protect,updateProfile)
router.post("/profilephoto",protect,uploadPhoto)
router.get("/profile",protect,getUserProfile)
router.get("/home",protect,getHome)
router.post("/",registerUser)
router.post("/otp",verifyOTP)
router.post("/resestpassword",resestPassword)
router.post("/confirmpassword",confirmPassword)
router.post('/logout',userLogout)
router.post("/sendinterest",protect,sendinterest)    
router.post("/cancelinterest",protect,cancelInterest)    
router.get("/interestslist/:id",protect, getInterestsList);
router.post("/acceptinterest",protect, acceptInterest);
router.get("/match/:Id",protect, matchList);
router.post("/deletematch",protect,deleteMatch)
router.get("/userprofile",protect,getTargetUserProfile)
router.post("/googlelogin",googleAuthLogin)
router.post("/addshortlist",protect,addToShortList)
router.get("/shortlist/:userId",getShortlistProfiles)
  

export default router
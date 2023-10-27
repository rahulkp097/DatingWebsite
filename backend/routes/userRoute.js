import express from 'express'
const router=express.Router()
import  { verifyOTP, updateProfile, login,cancelInterest, registerUser, userLogout, resestPassword, confirmPassword, getUserProfile, uploadPhoto, getHome, sendinterest, getInterestsList, acceptInterest, matchList } from '../controllers/userController.js'
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
router.post("/sendinterest",sendinterest)    
router.post("/cancelinterest",cancelInterest)    
router.get("/interestslist/:id", getInterestsList);
router.post("/acceptinterest", acceptInterest);
router.get("/match/:Id", matchList);
  

export default router
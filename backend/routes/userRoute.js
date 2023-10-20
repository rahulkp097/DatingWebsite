import express from 'express'
const router=express.Router()
import { verifyOTP, updateProfile, login, registerUser, userLogout, resestPassword, confirmPassword, getUserProfile, uploadPhoto, getHome } from '../controllers/userController.js'
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

export default router
import express from 'express'
const router=express.Router()
import { getprofile, login, registerUser, userLogout } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.post("/login",login)
router.get("/profile",protect,getprofile)
router.post("/",registerUser)
router.post('/logout',userLogout)

export default router
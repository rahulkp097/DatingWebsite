import express from 'express'
const router=express.Router()
import { protect } from '../middlewares/authMiddleware.js'
import { adminLogin, getUserData } from '../controllers/adminController.js'

router.post("/",adminLogin)
router.get("/users",getUserData)
router.post('/logout',)

export default router
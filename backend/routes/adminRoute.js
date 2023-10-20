import express from 'express'
const router=express.Router()
import { adminLogin, adminLogout, getUserData, userAction } from '../controllers/adminController.js'
import { adminAuthProtect } from '../middlewares/adminAuth.js'
router.post("/",adminLogin)
router.get("/users", adminAuthProtect, getUserData);
router.put("/users",adminAuthProtect,userAction)
router.post('/logout',adminLogout)

export default router
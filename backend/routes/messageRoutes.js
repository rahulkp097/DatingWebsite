import express from "express";
const router = express.Router();
import { protect } from "../middlewares/userAuth.js";
import { allMessages, sendMessage } from "../controllers/messagController.js";

router.post("/",protect,sendMessage)
router.get("/:chatId",protect,allMessages)


export default router
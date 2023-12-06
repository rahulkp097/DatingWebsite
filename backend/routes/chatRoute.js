import express from "express";
const router = express.Router();
import {
  accessChat,
  fetchChats,
  searchUsers,
} from "../controllers/chatController.js"; // Import fetchChats function
import { protect } from "../middlewares/userAuth.js";

router.get("/search", protect, searchUsers);
router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);

export default router;

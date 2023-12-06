import express from "express";
const router = express.Router();
import {
  DeleteSubscripctionPlan,
  UpdateSubscripctionPlan,
  addSubcripction,
  adminLogin,
  adminLogout,
  getDashboardData,
  getSubscripctions,
  getUserActivity,
  getUserData,
  userAction,
} from "../controllers/adminController.js";
import { adminAuthProtect } from "../middlewares/adminAuth.js";
router.post("/", adminLogin);
router.get("/users", adminAuthProtect, getUserData);
router.put("/users", adminAuthProtect, userAction);
router.post("/logout", adminLogout);
router.get("/subscriptions", adminAuthProtect, getSubscripctions);
router.get("/useractivity/:Id", adminAuthProtect, getUserActivity);
router.post("/addsubscription", adminAuthProtect, addSubcripction);
router.put("/updatesubscription", adminAuthProtect, UpdateSubscripctionPlan);
router.delete(
  "/deletesubscription/:id",
  adminAuthProtect,
  DeleteSubscripctionPlan
);
router.get("/dashboard", adminAuthProtect, getDashboardData);

export default router;

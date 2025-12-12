import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  getProfile,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteAccount
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/", authMiddleware, getProfile);
router.put("/name", authMiddleware, updateProfile);
router.put("/email", authMiddleware, updateEmail);
router.put("/password", authMiddleware, updatePassword);
router.delete("/", authMiddleware, deleteAccount);

export default router;

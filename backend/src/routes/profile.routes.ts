import express from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteProfile
} from "../controllers/profile.controller";

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteProfile);

export default router;

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount
} from "../controllers/account.controller.js";

const router = Router();

router.use(authMiddleware);
router.get("/", getAccounts);
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;

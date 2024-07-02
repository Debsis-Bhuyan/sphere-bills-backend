import { Router } from "express";
const router = Router();
import {
  requestPasswordReset,
  updatePassword,
} from "../controller/userControllers.js";
import {
  login,
  register,
  changePassword,
  updateProfile,
} from "../controller/authController.js";

router.post("/register", register);

router.post("/login", login);
router.post("/forget-password", requestPasswordReset);
router.post("/update-password", updatePassword);

import authenticateUser from "../middleware/authMiddleware.js";
router.post("/reset-password", authenticateUser, changePassword);
router.put("/update-profile", authenticateUser, updateProfile);

export default router;

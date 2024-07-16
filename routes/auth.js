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
  getProfileData,
} from "../controller/authController.js";

router.post("/register", register);

router.post("/login", login);
router.get("/get-profile/:userId", getProfileData);


import authenticateUser from "../middleware/authMiddleware.js";

router.post("/forget-password",authenticateUser, requestPasswordReset);
router.post("/update-password",authenticateUser, updatePassword);

router.post("/reset-password", authenticateUser, changePassword);
router.put("/update-profile", authenticateUser, updateProfile);

export default router;

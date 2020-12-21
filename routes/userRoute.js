import express from "express";
import {
  allUsers,
  getUserDetailsById,
  loginUser,
  signupUser,
  updateProfilePic,
  updateUserInfo,
} from "../controllers/userController.js";
import {
  loginValidation,
  signupValidation,
} from "../validations/userValidation.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.get("/", allUsers);
router.get("/me", isAuthenticated, getUserDetailsById);
router.post("/signup", signupValidation, signupUser);
router.post("/login", loginValidation, loginUser);
router.put("/update", isAuthenticated, updateUserInfo);
router.put(
  "/update/profilepic",
  isAuthenticated,
  upload.single("avatar"),
  updateProfilePic
);

export default router;

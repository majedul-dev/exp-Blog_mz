import express from "express";
import {
  createProfile,
  getProfileByMe,
  getUserProfileByUserId,
} from "../controllers/profileController.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import { createProfileValidation } from "../validations/profileValidation.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.get("/me", isAuthenticated, getProfileByMe);
router.get("/:userId", getUserProfileByUserId);
router.post(
  "/",
  isAuthenticated,
  createProfileValidation,
  upload.single("avatar"),
  createProfile
);

export default router;

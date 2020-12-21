import express from "express";
import { thumbnailImg } from "../controllers/uploadController.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/thumbnail",
  isAuthenticated,
  upload.single("post-thumbnail"),
  thumbnailImg
);

export default router;

import express from "express";
import {
  createReplyCommentController,
  getReplies,
} from "../controllers/replyCommentController.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/:commentId", isAuthenticated, createReplyCommentController);
router.get("/:commentId", getReplies);

export default router;

import express from "express";
import {
  commentPostController,
  commentUpdateController,
  getAllComments,
  deleteMyComments,
  replyCommentController,
  deleteReplyCommentController,
} from "../controllers/commentController.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
const router = express.Router();

router.post("/:postId", isAuthenticated, commentPostController);
router.put("/:commentId/edit", isAuthenticated, commentUpdateController);
router.get("/", getAllComments);
router.delete("/my/:commentId", isAuthenticated, deleteMyComments);
router.post("/replies/:commentId", isAuthenticated, replyCommentController);
router.delete(
  "/replies/:commentId/:replyId",
  isAuthenticated,
  deleteReplyCommentController
);

export default router;

import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  myPosts,
  updatePost,
  getSinglePost,
  likeOnPostController,
  unLikeOnPostController,
  getLikesOrDislikes,
  dislikeOnPostController,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/authmiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { createPostValidation } from "../validations/postValidator.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/my", isAuthenticated, myPosts);
router.get("/:id", getSinglePost);
router.post(
  "/",
  isAuthenticated,
  upload.single("thumbnail"),
  createPostValidation,
  createPost
);
router.put("/:id", isAuthenticated, upload.single("thumbnail"), updatePost);
router.delete("/:id", isAuthenticated, deletePost);
router.get("/likedislike/:postId", getLikesOrDislikes);
router.get("/like/:postId", isAuthenticated, likeOnPostController);
router.get("/dislike/:postId", isAuthenticated, dislikeOnPostController);

// router.post("/comment/:id", isAuthenticated, commentOnPost);
// router.get("/comment/:id", getAllComments);
// router.delete(
//   "/comment/:id/:commentId",
//   isAuthenticated,
//   deleteCommentFromPost
// );
// router.post(
//   "/uploads/postImage",
//   isAuthenticated,
//   upload.single("post-image"),
//   postImageUploadController
// );

export default router;

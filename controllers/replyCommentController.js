import User from "../models/User.js";
import Comment from "../models/Comment.js";
import ReplyComment from "../models/ReplyComment.js";

export const createReplyCommentController = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const user = await User.findById(req.user.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "You are not authenticated user" });

    if (!comment) return res.status(400).json({ message: "Comment not found" });

    const createdReplyComment = new ReplyComment({
      replyBody: req.body.replyBody,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      comment: req.params.commentId,
    });

    const updateComment = await Comment.findOneAndUpdate(
      { _id: comment._id },
      { $push: { replies: createdReplyComment._id } }
    );

    res.json(updateComment.replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getReplies = async (req, res) => {
  try {
    const replies = await Comment.findById(req.params.commentId).populate({
      path: "replies",
      model: "ReplyComment",
      populate: {
        path: "replyComment",
      },
    });

    res.json(replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

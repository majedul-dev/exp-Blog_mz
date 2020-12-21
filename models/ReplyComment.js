import mongoose from "mongoose";

const replyCommentSchema = new mongoose.Schema(
  {
    replyBody: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    name: String,
    avatar: String,
  },
  { timestamps: true }
);

const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

export default ReplyComment;

import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// @route   POST api/comments/:postId
// @desc    Create a comment on a post
// @access  Private
export const commentPostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;

    const user = await User.findById(req.user.id).select("name avatar");

    if (!req.user)
      return res
        .status(403)
        .json({ message: "You are not loged user, let login for comment!" });

    const newComment = new Comment({
      post: postId,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      body,
      replies: [],
    });

    const createComment = await newComment.save();
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: createComment._id } }
    );

    const commentData = await Comment.findById(createComment._id);

    res.json(commentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   PUT api/comments/:commentId/edit
// @desc    Update a comment from a post
// @access  Private
export const commentUpdateController = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!req.user)
      return res
        .status(403)
        .json({ message: "You are not loged user, let login first" });

    const updateComment = await Comment.findOneAndUpdate(
      { _id: comment._id },
      {
        $set: {
          body: req.body.body,
        },
      }
    );

    const editedComment = await updateComment.save();
    res.json(editedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/comments
// @desc    Get all comments
// @access  Public
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "replies",
      })
      .sort({ createdAt: "desc" });
    if (!comments) return res.status(404).json({ message: "No comment" });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   DELETE api/comments/:commentId
// @desc    Delete comment by ID
// @access  Private
export const deleteMyComments = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(400).json({ message: "No comment" });

    if (comment.user.toString() === req.user.id) {
      await comment.remove();
    } else {
      return res.status(401).json({ message: "Not permitted." });
    }

    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   POST api/comments/replies/:commentId
// @desc    Reply on a comment
// @access  Private
export const replyCommentController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "You are not authenticated user" });

    const reply = {
      replyBody: req.body.replyBody,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
    };

    const replyComment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId },
      { $push: { replies: reply } }
    );

    res.json(replyComment.replies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   DELETE api/comments/replies/:commentId/:replyId
// @desc    Delete reply comment
// @access  Private
export const deleteReplyCommentController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "You are not authenticated user" });

    const comment = await Comment.findById(req.params.commentId);

    const removeComment = comment.replies.find(
      (reply) => reply._id.toString() === req.params.replyId
    );

    console.log(removeComment);

    if (!removeComment)
      return res.status(400).json({ message: "Comment not found" });

    await removeComment.remove();

    res.json({ message: "Reply comment deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/comments/:commentId
// @desc    Get single comment
// @access  Public
// export const getSingleComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId);
//     if (!comment) return res.status(404).json({ message: "No comment" });
//     if (!comment.user.toString() === req.user.id) {
//       return res.status(401).json({ message: "Not permitted." });
//     }
//     res.json(comment);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

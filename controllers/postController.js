import readingTime from "reading-time";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import { validationResult } from "express-validator";

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .populate("comments", "_id, user");
    if (!posts) {
      return res.status(404).json({ message: "No post found!" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/posts/:id
// @desc    Get single post
// @access  Public
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    // .sort({ createdAt: "desc" });
    if (!post) {
      return res.status(404).json({ message: "No post found!" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/posts/my
// @desc    Get all posts
// @access  Private
export const myPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });

    const myPosts = posts.filter(
      (post) => post.user.toString() === req.user.id
    );

    if (!myPosts) return res.status(404).json({ message: "No Post Found!" });

    res.json(myPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   POST api/posts
// @desc    Post a post
// @access  Private
export const createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");

    let newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      body: req.body.body,
      author: user.name,
      avatar: user.avatar,
      thumbnail: req.file && `/uploads/${req.file.filename}`,
      readTime: readingTime(req.body.body).text,
      comments: [],
    });

    // if (req.file) {
    //   newPost.thumbnail = `/uploads/${req.file.filename}`;
    // }

    const createdPost = await newPost.save();
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { posts: createdPost._id } }
    );
    res.json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   PUT api/posts/:id
// @desc    Create and Update a post
// @access  Private
// export const createAndUpdatePost = async (req, res) => {
//   try {
//     const { user, title, body, author, avatar, thumbnail, readTime } = req.body;

//     const
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: post._id },
      {
        $set: {
          title: req.body.title,
          body: req.body.body,
          readTime: readingTime(req.body.body).text,
          thumbnail: `/uploads/${req.file.filename}`,
        },
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.remove();
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { posts: req.params.id } }
    );
    res.json({ message: "Post Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   PUT api/posts/like/:id
// @desc    Like on a post
// @access  Private
export const likeOnPostController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postId);
    if (!user) return res.status(401).json({ message: "Not authorized" });

    if (post.disLikes.includes(req.user.id)) {
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { disLikes: req.user.id } }
      );
    }
    if (post.likes.includes(req.user.id)) {
      // return res.status(400).json({ message: "You already liked the post" });
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { likes: req.user.id } }
      );
      //   liked = false;
    } else {
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { likes: req.user.id } }
      );
    }

    const updatePost = await Post.findById(req.params.postId);
    res.status(200).json({
      totalLikes: updatePost.likes.length,
      totalDisLikes: updatePost.disLikes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   PUT api/posts/dislike/:postId
// @desc    dislike on a post
// @access  Private
export const dislikeOnPostController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.postId);
    if (!user) return res.status(401).json({ message: "Not authorized" });

    if (post.likes.includes(req.user.id)) {
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { likes: req.user.id } }
      );
    }
    if (post.disLikes.includes(req.user.id)) {
      // return res.status(400).json({ message: "You already liked the post" });
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $pull: { disLikes: req.user.id } }
      );
      //   liked = false;
    } else {
      await Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { disLikes: req.user.id } }
      );
    }

    const updatePost = await Post.findById(req.params.postId);
    res.status(200).json({
      totalLikes: updatePost.likes.length,
      totalDisLikes: updatePost.disLikes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   GET api/posts/likedislike
// @desc    Like on a post
// @access  Private
export const getLikesOrDislikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    res.status(200).json({
      likes: post.likes,
      disLikes: post.disLikes,
      totalLikes: post.likes.length,
      totalDisLikes: post.disLikes.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const unLikeOnPostController = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @route   PUT api/posts/like/:id
// @desc    Like on a post
// @access  Private
// export const likeOnPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post has already been liked
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id).length >
//       0
//     ) {
//       return res.status(400).json({ message: "Post already liked" });
//     }

//     post.likes.unshift({ user: req.user.id });

//     await post.save();
//     res.json(post.likes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// @route   PUT api/posts/unlike/:id
// @desc    Unlike on a post
// @access  Private
// export const unLikeOnPost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     // Check if the post already been liked
//     if (
//       post.likes.filter((like) => like.user.toString() === req.user.id)
//         .length === 0
//     ) {
//       return res.status(400).json({ message: "Post has not yet been liked" });
//     }

//     const removeIndex = post.likes
//       .map((like) => like.user.toString())
//       .indexOf(req.user.id);
//     console.log(removeIndex);
//     post.likes.splice(removeIndex, 1);

//     await post.save();
//     res.json({ message: "Like removed" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// @route   GET api/posts/comment/:postId
// @desc    Get all comments
// @access  Public
// export const getAllComments = async (req, res) => {
//   try {
//     const comment = await Post.findById(req.params.id).sort({
//       createdAt: "desc",
//     });

//     if (!comment.comments.length > 0)
//       return res.status(404).json({ message: "No comment placed yet!" });

//     res.json(comment.comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @route   POST api/posts/comment/:id
// // @desc    Comment on a post
// // @access  Private
// export const commentOnPost = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     const post = await Post.findById(req.params.id);

//     if (!post) return res.status(400).json({ message: "Post not found" });

//     const newComment = {
//       text: req.body.text,
//       name: user.name,
//       avatar: user.avatar,
//       user: req.user.id,
//     };

//     post.comments.unshift(newComment);
//     await post.save();

//     res.json(post.comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // @route   DELETE api/posts/comment/:id/:comentId
// // @desc    Delete comment from post
// // @access  Private
// export const deleteCommentFromPost = async (req, res) => {
//   try {
//     const post = await Post.find(req.params.id);
//     const comment = await post.comments.find(
//       (comment) => comment.id === req.params.commentId
//     );

//     if (!comment)
//       return res.status(404).json({ message: "Comment dose not exist" });
//     if (comment.user.toString() !== req.user.id)
//       return res.status(401).json({ message: "User not authorized" });

//     // comments.filter((comment) => comment._id !== req.params.commentId);

//     // await post.comments.findOneAndDelete(
//     //   (comment) => comment.id !== req.params.commentId
//     // );

//     await Post.findOneAndUpdate(req.params.id);
//     const removeIndex = post.comments
//       .map((comment) => comment.user.toString())
//       .indexOf(req.user.id);
//     post.comments.splice(removeIndex, 1);

//     // console.log(removeIndex);

//     await post.save();

//     res.json({ message: "Comment Deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const postImageUploadController = (req, res) => {
  if (req.file) {
    res.status(200).json({
      imageUrl: `/uploads/${req.file.filename}`,
    });
  }

  return res.status(500).json({
    message: "Server Error",
  });
};

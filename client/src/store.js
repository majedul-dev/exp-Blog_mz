import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  addDisLikeReducer,
  addLikeReducer,
  createPostReducer,
  deletePostReducer,
  getAllPostReducer,
  getLikesDislikesReducer,
  getSinglePostReducer,
  myOwnPostsReducer,
  updatePostReducer,
  // uploadPostImageReducer,
} from "./reducers/postsReducer";
import {
  updateUserProfilePictureReducer,
  updateUserReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducer";
import {
  createProfileReducer,
  getProfileReducer,
  getUserProfileReducer,
} from "./reducers/profileReducer";
import {
  commentOnPostReducer,
  deleteCommentReducer,
  getCommentsReducer,
  getSingleCommentReducer,
  replyCommentReducer,
  updateCommentReducer,
} from "./reducers/commentReducer";

const reducer = combineReducers({
  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  updateUserProfilePictur: updateUserProfilePictureReducer,

  // Profile reducers
  getProfile: getProfileReducer,
  createProfile: createProfileReducer,
  getUserProfile: getUserProfileReducer,

  // Post reducers
  getAllPosts: getAllPostReducer,
  getSinglePost: getSinglePostReducer,
  myOwnPosts: myOwnPostsReducer,
  createPost: createPostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
  addLike: addLikeReducer,
  addDisLike: addDisLikeReducer,
  getLikesDislikes: getLikesDislikesReducer,

  // Comment reducers
  commentOnPost: commentOnPostReducer,
  deleteComment: deleteCommentReducer,
  getSingleComment: getSingleCommentReducer,
  updateComment: updateCommentReducer,
  getComments: getCommentsReducer,
  replyComment: replyCommentReducer,
  // uploadPostImage: uploadPostImageReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

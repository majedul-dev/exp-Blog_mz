import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  GET_LIKEDISLIKE_FAIL,
  GET_LIKEDISLIKE_REQUEST,
  GET_LIKEDISLIKE_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_SINGLE_POST_FAIL,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  MY_OWN_POSTS_FAIL,
  MY_OWN_POSTS_REQUEST,
  MY_OWN_POSTS_SUCCESS,
  POST_DISLIKE_FAIL,
  POST_DISLIKE_REQUEST,
  POST_DISLIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPLOAD_IMAGE_FROM_POST_FAIL,
  UPLOAD_IMAGE_FROM_POST_REQUEST,
  UPLOAD_IMAGE_FROM_POST_SUCCESS,
} from "../constants/postsConstants";

export const getAllPostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { loading: true };
    case GET_POSTS_SUCCESS:
      return {
        loading: false,
        success: true,
        posts: action.payload,
        page: action.page,
      };
    case GET_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSinglePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_POST_REQUEST:
      // case GET_POSTS_REQUEST:
      return { loading: true };
    case GET_SINGLE_POST_SUCCESS:
      return { loading: false, post: action.payload };
    // case GET_POSTS_SUCCESS:
    //   return {
    //     post:
    //       state.post._id === action.payload.id
    //         ? { ...state.post, likes: action.payload.likes }
    //         : state.post,
    //     loading: false,
    //   };
    case GET_SINGLE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const myOwnPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case MY_OWN_POSTS_REQUEST:
      return { loading: true };
    case MY_OWN_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case MY_OWN_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { loading: false, createPostSuccess: true, post: action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePostReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { loading: true };
    case UPDATE_POST_SUCCESS:
      return { loading: false, updatedPost: action.payload };
    case UPDATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const uploadPostImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_FROM_POST_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_FROM_POST_SUCCESS:
      return { loading: false, image: action.payload };
    case UPLOAD_IMAGE_FROM_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return { loading: false, success: true, likes: action.payload };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addDisLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DISLIKE_REQUEST:
      return { loading: true };
    case POST_DISLIKE_SUCCESS:
      return { loading: false, dislikeSuccess: true, dislikes: action.payload };
    case POST_DISLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getLikesDislikesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIKEDISLIKE_REQUEST:
      return { loading: true };
    case GET_LIKEDISLIKE_SUCCESS:
      return { loading: false, success: true, likesDislikes: action.payload };
    case GET_LIKEDISLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

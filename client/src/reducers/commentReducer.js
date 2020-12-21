import {
  COMMENT_ON_POST_FAIL,
  COMMENT_ON_POST_REQUEST,
  COMMENT_ON_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  GET_SINGLE_COMMENT_REQUEST,
  GET_SINGLE_COMMENT_SUCCESS,
  GET_SINGLE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  REPLY_COMMENT_REQUEST,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAIL,
} from "../constants/commentConstant";

export const commentOnPostReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_ON_POST_REQUEST:
      return { loading: true };
    case COMMENT_ON_POST_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_ON_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMMENT_REQUEST:
      return { loading: true };
    case UPDATE_COMMENT_SUCCESS:
      return { loading: false, updatedSuccess: true };
    case UPDATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true };
    case GET_COMMENTS_SUCCESS:
      return { loading: false, success: true, comments: action.payload };
    case GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true,
      };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSingleCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_COMMENT_REQUEST:
      return { loading: true };
    case GET_SINGLE_COMMENT_SUCCESS:
      return {
        loading: false,
        comment: action.payload,
      };
    case GET_SINGLE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const replyCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case REPLY_COMMENT_REQUEST:
      return { loading: true };
    case REPLY_COMMENT_SUCCESS:
      return { loading: false, replyCommentSuccess: true };
    case REPLY_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

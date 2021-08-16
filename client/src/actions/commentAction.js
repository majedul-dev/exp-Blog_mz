import axios from "axios";
import {
  COMMENT_ON_POST_FAIL,
  COMMENT_ON_POST_REQUEST,
  COMMENT_ON_POST_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_SINGLE_COMMENT_FAIL,
  GET_SINGLE_COMMENT_REQUEST,
  GET_SINGLE_COMMENT_SUCCESS,
  REPLY_COMMENT_FAIL,
  REPLY_COMMENT_REQUEST,
  REPLY_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
} from "../constants/commentConstant";

export const commentOnPostAction =
  (formData, postId) => async (dispatch, getState) => {
    try {
      dispatch({ type: COMMENT_ON_POST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "Application/JSON",
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.URL}/api/comments/${postId}`,
        formData,
        config
      );

      dispatch({ type: COMMENT_ON_POST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COMMENT_ON_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const updateCommentAction =
  (formData, commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Accept: "Application/JSON",
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.URL}/api/comments/${commentId}/edit`,
        formData,
        config
      );

      dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getComments = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS_REQUEST });

    const { data } = await axios.get(`${process.env.URL}/api/comments`);

    dispatch({ type: GET_COMMENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteCommentAction =
  (commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `${process.env.URL}/api/comments/my/${commentId}`,
        config
      );
      dispatch({ type: DELETE_COMMENT_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const getSingleCommentAction =
  (commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_SINGLE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.URL}/api/comments/single/${commentId}`,
        config
      );
      dispatch({ type: GET_SINGLE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_SINGLE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const replyCommentAction =
  (formData, commentId) => async (dispatch, getState) => {
    try {
      dispatch({ type: REPLY_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${process.env.URL}/api/comments/replies/${commentId}`,
        formData,
        config
      );

      dispatch({ type: REPLY_COMMENT_SUCCESS });
    } catch (error) {
      dispatch({
        type: REPLY_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

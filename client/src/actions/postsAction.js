import axios from "axios";
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
} from "../constants/postsConstants";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const { data } = await axios.get("/api/posts");

    dispatch({ type: GET_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getSinglePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_POST_REQUEST });

    const { data } = await axios.get(`/api/posts/${postId}`);

    dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getMyOwnPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_OWN_POSTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/posts/my", config);

    dispatch({ type: MY_OWN_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MY_OWN_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createPostAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

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

    const { data } = await axios.post("/api/posts", formData, config);

    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updatePostAction = (id, formData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

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

    const { data } = await axios.put(`/api/posts/${id}`, formData, config);

    dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/posts/${id}`, config);

    dispatch({ type: DELETE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const addLikeAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

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

    const { data } = await axios.get(`/api/posts/like/${postId}`, config);

    // const resData = post._id === id ? post.likes.push(data) : post;

    dispatch({ type: POST_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const addDisLikeAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DISLIKE_REQUEST });

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

    const { data } = await axios.get(`/api/posts/dislike/${postId}`, config);

    dispatch({ type: POST_DISLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_DISLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getLikeDislikeAction = (postId) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIKEDISLIKE_REQUEST });

    const { data } = await axios.get(`/api/posts/likedislike/${postId}`);

    dispatch({ type: GET_LIKEDISLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIKEDISLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

// export const uploadImageFromPost = (selectedImage) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({ type: UPLOAD_IMAGE_FROM_POST_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Accept: "Application/JSON",
//         "Content-Type": "Application/JSON",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     let formData = new FormData();
//     formData.append("post-thumbnail", selectedImage);

//     let { data } = await axios.post("/api/uploads/thumbnail", formData, config);
//     dispatch({ type: UPLOAD_IMAGE_FROM_POST_SUCCESS, payload: data });

//     console.log(data);
//   } catch (error) {
//     dispatch({
//       type: UPLOAD_IMAGE_FROM_POST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.response,
//     });
//   }
// };

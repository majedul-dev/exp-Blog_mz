import axios from "axios";
import { CLEAR_PROFILE } from "../constants/profileConstants";
import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_PROFILEPICTURE_FAIL,
  UPDATE_USER_PROFILEPICTURE_REQUEST,
  UPDATE_USER_PROFILEPICTURE_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${process.env.URL}/api/users/me`, config);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserLogin = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axios.post(
      `${process.env.URL}/api/users/login`,
      formData
    );

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${process.env.URL}/api/users/signup`,
      formData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const updateUserAction = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.URL}/api/users/update`,
      formData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const profilePicUpdateAction =
  (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_PROFILEPICTURE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `${process.env.URL}/api/users/update/profilepic`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_USER_PROFILEPICTURE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_PROFILEPICTURE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: USER_LOGOUT });
};

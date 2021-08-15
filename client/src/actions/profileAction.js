import axios from "axios";
import {
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
} from "../constants/profileConstants";

export const getProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/profile/me", config);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserProfileAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/profile/${userId}`);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const createProfileAction = (formData, history, edit = false) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("http://localhost:5000/api/profile", formData, config);
    dispatch({ type: CREATE_PROFILE_SUCCESS, payload: data });

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

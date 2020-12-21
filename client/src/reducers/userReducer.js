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

// Login User Reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Register User Reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Get user details
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_PROFILEPICTURE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// Update user
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Update user profile picture
export const updateUserProfilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILEPICTURE_REQUEST:
      return { loading: true };
    case UPDATE_USER_PROFILEPICTURE_SUCCESS:
      return { loading: false, successProfilePic: true };
    case UPDATE_USER_PROFILEPICTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

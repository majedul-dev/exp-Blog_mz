import {
  CLEAR_PROFILE,
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

export const getProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true };
    case GET_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};

export const getUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE_REQUEST:
      return { loading: true };
    case CREATE_PROFILE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case CREATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

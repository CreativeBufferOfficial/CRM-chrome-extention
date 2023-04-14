import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  // UPDATE_PROFILE_REQUEST,
  // UPDATE_PROFILE_SUCCESS,
  // UPDATE_PROFILE_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CLEAR_ERRORS,
} from '../constants/UserConstant';
import axios from 'axios';

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      `https://crm.creativebuffer.com/api/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

//Load User --  userDetails
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//Logout User
export const logout = () => async (dispatch) => {
  try {
    // const config = { headers: { 'Content-Type': 'application/json' } };
    console.log('logout hitting');
    await axios.post(`https://crm.creativebuffer.com/api/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error });
  }
};

// // Update Profile
// export const updateProfile = (userData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });

//     const config = { headers: { 'Content-Type': 'multipart/form-data' } };
//     const { data } = await axios.put(`/api/v1/me/update`, userData, config);
//     console.log(data);
//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

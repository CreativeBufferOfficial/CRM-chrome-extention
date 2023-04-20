import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST_TODO,
  LOAD_USER_SUCCESS_TODO,
  LOAD_USER_FAIL_TODO,
  LOAD_USER_REQUEST_PROCESS,
  LOAD_USER_SUCCESS_PROCESS,
  LOAD_USER_FAIL_PROCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  // UPDATE_PROFILE_REQUEST,
  // UPDATE_PROFILE_SUCCESS,
  // UPDATE_PROFILE_FAIL,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  CLEAR_ERRORS,
} from '../constants/UserConstant';
// import axios from 'axios';
import { callAPI, callAPIWithoutAuth } from '../utlis/Apiutils';
import { apiUrls } from '../utlis/ApiUrl';

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    // const config = { headers: { 'Content-Type': 'application/json' } };

    // const { data } = await axios.post(
    //   `https://crm.creativebuffer.com/api/login`,
    //   { email, password },
    //   config
    // );

    const { data } = await callAPIWithoutAuth(apiUrls.login, 'post', {
      email,
      password,
    });
    console.log(data.data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Load User --  userDetails
export const loadUserTodo =
  (status, today, fromDate, toDate) => async (dispatch) => {
    console.log('inside api call');
    try {
      dispatch({ type: LOAD_USER_REQUEST_TODO });
      let data;
      // const { data } = await axios.get(`/api/v1/me`);
      if (status && today) {
        console.log(status, today);
        data = await callAPI(
          `${apiUrls.ticketStatus}${status}?todayDate=${today}`,
          'get'
        );
      } else if (status && fromDate && toDate) {
        data = await callAPI(
          `${apiUrls.ticketStatus}${status}?fromDate=${fromDate}&toDate=${toDate}`,
          'get'
        );
      }
      console.log('data hjhj >>', data.data.projectTasks);

      dispatch({
        type: LOAD_USER_SUCCESS_TODO,
        payload: data.data.projectTasks,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL_TODO,
        payload: error,
      });
    }
  };

// //Load User --  userDetails
// export const loadUserProcess = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USER_REQUEST_PROCESS });

//     // const { data } = await axios.get(`/api/v1/me`);

//     const data = await callAPI(`${apiUrls.ticketStatus}${1}`, 'get');

//     console.log(data.data.projectTasks.projectTasks);
//     dispatch({ type: LOAD_USER_SUCCESS_PROCESS, payload: data.data });
//   } catch (error) {
//     dispatch({
//       type: LOAD_USER_FAIL_PROCESS,
//       payload: error.response.data.message,
//     });
//   }
// };

//Logout User
export const logout = () => async (dispatch) => {
  try {
    // const config = { headers: { 'Content-Type': 'application/json' } };
    console.log('logout hitting');
    await callAPI(apiUrls.logout, 'post');
    // await axios.post(`https://crm.creativebuffer.com/api/logout`, config);
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
export const updateTicketStatus = (ticket_id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TICKET_REQUEST });
    console.log(ticket_id, status);
    // const config = { headers: { 'Content-Type': 'application/json' } };
    const data = await callAPI(
      `${apiUrls.updateTicketStatus}${ticket_id}`,
      'post',
      {
        status,
      }
    );

    // const { data } = await axios.put(
    //   `/api/v1/admin/user/${id}`,
    //   userData,
    //   config
    // );

    console.log(data);
    console.log(data.data.message);

    dispatch({ type: UPDATE_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_TICKET_FAIL,
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

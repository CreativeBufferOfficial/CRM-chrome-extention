import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST_TODO,
  LOAD_USER_SUCCESS_TODO,
  LOAD_USER_FAIL_TODO,
  LOAD_USER_REQUEST_INPROCCESS,
  LOAD_USER_SUCCESS_INPROCCESS,
  LOAD_USER_FAIL_INPROCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  CLEAR_ERRORS,
} from '../constants/UserConstant';
import { callAPI, callAPIWithoutAuth } from '../utlis/Apiutils';
import { apiUrls } from '../utlis/ApiUrl';

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await callAPIWithoutAuth(apiUrls.login, 'post', {
      email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//loadUser Ticket
export const loadUser =
  (status, today, fromDate, toDate) => async (dispatch) => {
    try {
      dispatch({
        type:
          status === 1 ? LOAD_USER_REQUEST_TODO : LOAD_USER_REQUEST_INPROCCESS,
      });

      let data;
      if (status && today) {
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
      dispatch({
        type:
          status === 1 ? LOAD_USER_SUCCESS_TODO : LOAD_USER_SUCCESS_INPROCCESS,
        payload: data.data.projectTasks,
      });
    } catch (error) {
      dispatch({
        type: status === 1 ? LOAD_USER_FAIL_TODO : LOAD_USER_FAIL_INPROCCESS,
        payload: error.response.data.message,
      });
    }
  };

//Logout User
export const logout = () => async (dispatch) => {
  try {
    await callAPI(apiUrls.logout, 'post');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error });
  }
};

// Update Ticket
export const updateTicketStatus = (ticket_id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TICKET_REQUEST });
    const data = await callAPI(
      `${apiUrls.updateTicketStatus}${ticket_id}`,
      'post',
      {
        status,
      }
    );

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

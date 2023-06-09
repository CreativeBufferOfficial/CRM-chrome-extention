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
  UPDATE_TICKET_RESET,
  CLEAR_ERRORS,
} from '../constants/UserConstant';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        // isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userTodoTicketReducer = (state = { ticketTodo: {} }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST_TODO:
      return {
        loadingTodo: true,
        // isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS_TODO:
      return {
        ...state,
        loadingTodo: false,
        isAuthenticated: true,
        ticketTodo: action.payload,
      };
    case LOAD_USER_FAIL_TODO:
      return {
        loadingTodo: false,
        isAuthenticated: false,
        ticketTodo: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const userInProccessTicketReducer = (
  state = { ticketInProccess: {} },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST_INPROCCESS:
      return {
        loadingInProcess: true,
        // isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS_INPROCCESS:
      return {
        ...state,
        loadingInProcess: false,
        isAuthenticated: true,
        ticketInProccess: action.payload,
      };
    case LOAD_USER_FAIL_INPROCCESS:
      return {
        loadingInProcess: false,
        isAuthenticated: false,
        ticketInProccess: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TICKET_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

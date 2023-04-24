import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import {
  userReducer,
  statusReducer,
  userTodoTicketReducer,
  userInProccessTicketReducer,
} from '../reducers/UserReducer';

let initialState = {};
const reducer = combineReducers({
  user: userReducer,
  ticketTodo: userTodoTicketReducer,
  ticketInProccess: userInProccessTicketReducer,
  status: statusReducer,
});

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

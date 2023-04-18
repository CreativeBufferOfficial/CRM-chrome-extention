import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userReducer,
  statusReducer,
  userTicketReducer,
} from '../reducers/UserReducer';

const reducer = combineReducers({
  user: userReducer,
  ticket: userTicketReducer,
  status: statusReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

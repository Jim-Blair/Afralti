import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import orderReducer from './order/order.reducer';

export default combineReducers({
  auth: authReducer,
  orders: orderReducer,
});

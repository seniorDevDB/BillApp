import { combineReducers } from 'redux'

import authReducer from "./auth.reducer.js";
import paymentReducer from "./payment.reducer.js";

export default combineReducers({
    auth: authReducer,
    payment: paymentReducer,
});
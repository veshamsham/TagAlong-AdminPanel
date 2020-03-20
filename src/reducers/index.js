/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import AuthReducer from "./Authreducer";
import AllUserlist from "./AllUserreducer";

export default combineReducers({
  auth: AuthReducer,
  alluserlist: AllUserlist
});

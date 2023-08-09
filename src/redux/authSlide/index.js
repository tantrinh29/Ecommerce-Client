
import { combineReducers } from "redux";
import authSlice from "./authSlide";

const authReducer = combineReducers({
    auth: authSlice,
});

export default authReducer;


import { combineReducers } from "redux";
import cartSlice from "./cartSlice";

const cartReducer = combineReducers({
    cart: cartSlice,
});

export default cartReducer;

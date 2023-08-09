import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, updateUserApi } from "../../api/authApi";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    register: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = action.payload.error;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = action.payload.error;
    },
    login: (state, action) => {
      // console.log(action)
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
});

export const { register, updateUser, login, logout, setError } =
  authSlice.actions;

// Thunk action để gọi API
export const registers = (username, email, password) => async (dispatch) => {
  try {
    const response = await registerAPI(username, email, password);
    if (response.status === true) {
      dispatch(register(response));
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(register({ error: response.message }));
      toast.error(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch(register(error));
  }
};

export const logins = (username, password) => async (dispatch) => {
  try {
    const response = await loginAPI(username, password);
    if (response.status === true) {
      if (response && response.accessToken) {
        const decodedToken = jwt_decode(response.accessToken);
        dispatch(login(decodedToken));
      } else {
        dispatch(login("Access token not found"));
      }

      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(login({ error: response.message }));
      toast.error(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error) {
    dispatch(login({ error }));
  }
};

// Action Creator cho việc đăng xuất
export const logouts = () => async (dispatch) => {
  try {
    dispatch(logout()); // Dispatch action thông báo đăng xuất thành công
  } catch (error) {
    dispatch(logout(error));
  }
};

export const updateOrderUser = (values, email) => async (dispatch) => {
  try {
    const { phone, address } = values;
    // Gọi API với các giá trị đã truyền vào
    const huydev = {
      phone,
      address,
      email,
    };
    const response = await updateUserApi(huydev);
    dispatch(updateUser(response)); // Dispatch action lên lại
  } catch (error) {
    dispatch(updateUser(error));
  }
};

export default authSlice.reducer;

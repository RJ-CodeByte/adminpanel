import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_CHANGE_PWD,
  API_FORGOT_PWD,
  API_LOGIN,
  API_LOGOUT,
  CHANGE_PWD_F,
  CHANGE_PWD_S,
  FORGOT_P_F,
  FORGOT_P_S,
  LOGIN_F,
  LOGIN_S,
  LOGOUT_F,
  LOGOUT_S,
  LS_AUTHTOKEN,
  LS_USER,
} from "../constants";

const initialState = {
  // Global loader for api
  isLoading: false,

  // Auth Data
  isLoggedIn: false,
  userData: [],
  changePassword: "",
  forgotPassword: "",
};

export const loginAction = (data) => ({
  type: "API",
  payload: {
    url: API_LOGIN,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: LOGIN_S,
      payload: data,
    }),
    error: (data) => ({
      type: LOGIN_F,
      payload: {},
    }),
  },
});

export const forgetPwdAction = (data) => ({
  type: "API",
  payload: {
    url: API_FORGOT_PWD,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: FORGOT_P_S,
      payload: data,
    }),
    error: (data) => ({
      type: FORGOT_P_F,
      payload: {},
    }),
  },
});

export const changePwdAction = (data) => ({
  type: "API",
  payload: {
    url: API_CHANGE_PWD,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: CHANGE_PWD_S,
      payload: data,
    }),
    error: (data) => ({
      type: CHANGE_PWD_F,
      payload: {},
    }),
  },
});

export const logOutAction = (authToken) => ({
  type: "API",
  payload: {
    url: API_LOGOUT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    hideLoader: false,
    success: (data) => ({
      type: LOGOUT_S,
      payload: data,
    }),
    error: (data) => ({
      type: LOGOUT_F,
      payload: {},
    }),
  },
});

// Reducer
const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(LOGIN_S, (state, action) => {
      // Default header for auth
      axios.defaults.headers.common["Authorization"] = action.payload.token;

      localStorage.setItem(
        LS_AUTHTOKEN,
        JSON.stringify(action.payload.data.accessToken)
      );

      localStorage.setItem(LS_USER, JSON.stringify(action.payload.data));

      state.userData = action.payload.data;
      state.isLoggedIn = true;
    });
    builder.addCase(LOGIN_F, (state, action) => {
      // remove items on logout
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(LS_AUTHTOKEN);
      localStorage.removeItem(LS_USER);

      state.userData = [];
      state.isLoggedIn = false;
    });

    // forgot password
    builder.addCase(FORGOT_P_S, (state, action) => {
      state.forgotPassword = action.payload.message;
    });
    builder.addCase(FORGOT_P_F, (state, action) => {
      state.forgotPassword = "";
    });

    // change password
    builder.addCase(CHANGE_PWD_S, (state, action) => {
      state.changePassword = action.payload.message;
    });
    builder.addCase(CHANGE_PWD_F, (state, action) => {
      state.changePassword = "";
    });

    // Logout
    builder.addCase(LOGOUT_S, (state, action) => {
      // Default header for auth
      // console.log("Logout ", action.payload);
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(LS_AUTHTOKEN);
      localStorage.removeItem(LS_USER);
      state.userData = [];
      state.isLoggedIn = false;
    });

    builder.addCase(LOGOUT_F, (state, action) => {
      // remove items on logout
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem(LS_AUTHTOKEN);
      localStorage.removeItem(LS_USER);

      state.userData = [];
      state.isLoggedIn = false;
    });
  },
});

export const { loaderChange } = loginSlice.actions;
export default loginSlice.reducer;

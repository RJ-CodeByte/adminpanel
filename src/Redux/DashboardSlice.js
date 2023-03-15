import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_CHANGE_PWD,
  API_DASHBOARD,
  API_FORGOT_PWD,
  API_LOGIN,
  API_LOGOUT,
  CHANGE_PWD_F,
  CHANGE_PWD_S,
  DASHBOARD_F,
  DASHBOARD_S,
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
  dashboardData: {},
};

export const dashboardAction = () => ({
  type: "API",
  payload: {
    url: API_DASHBOARD,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    hideLoader: false,
    success: (data) => ({
      type: DASHBOARD_S,
      payload: data,
    }),
    error: (data) => ({
      type: DASHBOARD_F,
      payload: {},
    }),
  },
});

// Reducer
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(DASHBOARD_S, (state, action) => {
      state.dashboardData = action.payload.data;
    });
    builder.addCase(DASHBOARD_F, (state, action) => {
      state.dashboardData = {};
    });
  },
});

export const { loaderChange } = dashboardSlice.actions;
export default dashboardSlice.reducer;

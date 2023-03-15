import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  API_ADD_ARTICLE,
  API_ARTICLE_DELETE,
  API_ARTICLE_LIST,
  API_EDIT_ARTICLE,
  API_GET_ARTICLE,
  ARTICLE_ADD_F,
  ARTICLE_ADD_S,
  ARTICLE_DELETE_F,
  ARTICLE_DELETE_S,
  ARTICLE_EDIT_F,
  ARTICLE_EDIT_S,
  ARTICLE_GET_F,
  ARTICLE_GET_S,
  ARTICLE_LIST_F,
  ARTICLE_LIST_S,
  LS_AUTHTOKEN,
} from "../constants";

const initialState = {
  // Global loader for api
  isLoading: false,

  // Auth Data
  isLoggedIn: false,
  articleList: [],
  articleDeleted: false,
  totalRecords: 0,
  articleAdded: false,
  articleDetails: {},
};

export const articleListAction = (data) => ({
  type: "API",
  payload: {
    url: API_ARTICLE_LIST,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_LIST_F,
      payload: {},
    }),
  },
});

export const deleteArticle = (data) => ({
  type: "API",
  payload: {
    url: API_ARTICLE_DELETE,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_DELETE_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_DELETE_F,
      payload: {},
    }),
  },
});
export const addArticle = (data) => ({
  type: "API",
  payload: {
    url: API_ADD_ARTICLE,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_ADD_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_ADD_F,
      payload: {},
    }),
  },
});

export const getArticle = (data) => ({
  type: "API",
  payload: {
    url: API_GET_ARTICLE,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_GET_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_GET_F,
      payload: {},
    }),
  },
});
export const editArticle = (data) => ({
  type: "API",
  payload: {
    url: API_EDIT_ARTICLE,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_EDIT_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_EDIT_F,
      payload: {},
    }),
  },
});

// Reducer
const articleSlice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    //list
    builder.addCase(ARTICLE_LIST_S, (state, action) => {
      state.articleList = action.payload.data.data;
      state.totalRecords = action.payload.data.recordsTotal;
    });
    builder.addCase(ARTICLE_LIST_F, (state, action) => {
      state.articleList = [];
      state.totalRecords = 0;
    });

    // get Article
    builder.addCase(ARTICLE_GET_S, (state, action) => {
      state.articleDetails = action.payload.data;
    });
    builder.addCase(ARTICLE_GET_F, (state, action) => {
      state.articleDetails = {};
    });
    //Add
    builder.addCase(ARTICLE_ADD_S, (state, action) => {
      state.articleAdded = true;
    });
    builder.addCase(ARTICLE_ADD_F, (state, action) => {
      state.articleAdded = false;
    });

    //delete
    builder.addCase(ARTICLE_DELETE_S, (state, action) => {
      state.articleDeleted = true;
    });
    builder.addCase(ARTICLE_DELETE_F, (state, action) => {
      state.articleDeleted = false;
    });
  },
});

export const { loaderChange } = articleSlice.actions;
export default articleSlice.reducer;

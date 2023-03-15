import { createSlice } from "@reduxjs/toolkit";
import {
  ADDRESS_P_F,
  ADDRESS_P_S,
  API_ADD_SHIPMENT,
  API_DELETE_SHIPMENT,
  API_EDIT_SHIPMENT,
  API_GET_SHIPMENT,
  API_MEDICATIONS,
  API_PATIENTS,
  API_PATIENTS_ADDRESS,
  API_SHIPMENT_LIST,
  LS_AUTHTOKEN,
  MEDICATIONS_F,
  MEDICATIONS_S,
  PATIENTS_F,
  PATIENTS_S,
  SHIPMENT_ADD_F,
  SHIPMENT_ADD_S,
  SHIPMENT_DELETE_F,
  SHIPMENT_DELETE_S,
  SHIPMENT_EDIT_F,
  SHIPMENT_EDIT_S,
  SHIPMENT_GET_F,
  SHIPMENT_GET_S,
  SHIPMENT_LIST_F,
  SHIPMENT_LIST_S,
} from "../constants";

const initialState = {
  // Global loader for api
  isLoading: false,

  shipmentList: [],
  patientsList: [],
  medicationsList: [],
  patientAddress: [],
  shipmentDeleted: false,
  totalRecords: 0,
  shipmentDetails: {},
  shipmentUpdated: false,
  shipmentAdded: false,
};

export const shipmentListAction = (data) => ({
  type: "API",
  payload: {
    url: API_SHIPMENT_LIST,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: SHIPMENT_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: SHIPMENT_LIST_F,
      payload: {},
    }),
  },
});

export const getShipment = (data) => ({
  type: "API",
  payload: {
    url: API_GET_SHIPMENT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: SHIPMENT_GET_S,
      payload: data,
    }),
    error: (data) => ({
      type: SHIPMENT_GET_F,
      payload: {},
    }),
  },
});
export const getPatients = (data) => ({
  type: "API",
  payload: {
    url: API_PATIENTS,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: PATIENTS_S,
      payload: data,
    }),
    error: (data) => ({
      type: PATIENTS_F,
      payload: {},
    }),
  },
});
export const getMedications = (data) => ({
  type: "API",
  payload: {
    url: API_MEDICATIONS,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: MEDICATIONS_S,
      payload: data,
    }),
    error: (data) => ({
      type: MEDICATIONS_F,
      payload: {},
    }),
  },
});

export const getPatientAddress = (data) => ({
  type: "API",
  payload: {
    url: API_PATIENTS_ADDRESS,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ADDRESS_P_S,
      payload: data,
    }),
    error: (data) => ({
      type: ADDRESS_P_F,
      payload: {},
    }),
  },
});

export const addShipment = (data) => ({
  type: "API",
  payload: {
    url: API_ADD_SHIPMENT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: SHIPMENT_ADD_S,
      payload: data,
    }),
    error: (data) => ({
      type: SHIPMENT_ADD_F,
      payload: {},
    }),
  },
});
export const editShipment = (data) => ({
  type: "API",
  payload: {
    url: API_EDIT_SHIPMENT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: SHIPMENT_EDIT_S,
      payload: data,
    }),
    error: (data) => ({
      type: SHIPMENT_EDIT_F,
      payload: {},
    }),
  },
});
export const deleteShipment = (data) => ({
  type: "API",
  payload: {
    url: API_DELETE_SHIPMENT,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.parse(localStorage.getItem(LS_AUTHTOKEN)),
    },
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: SHIPMENT_DELETE_S,
      payload: data,
    }),
    error: (data) => ({
      type: SHIPMENT_DELETE_F,
      payload: {},
    }),
  },
});

// Reducer
const shipmentSlice = createSlice({
  name: "shipment",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    //list
    builder.addCase(SHIPMENT_LIST_S, (state, action) => {
      state.shipmentList = action.payload.data.data;
      state.totalRecords = action.payload.data.recordsTotal;
    });
    builder.addCase(SHIPMENT_LIST_F, (state, action) => {
      state.shipmentList = [];
      state.totalRecords = 0;
    });

    //details
    builder.addCase(SHIPMENT_GET_S, (state, action) => {
      state.shipmentDetails = action.payload.data;
    });
    builder.addCase(SHIPMENT_GET_F, (state, action) => {
      state.shipmentList = [];
    });

    //patients
    builder.addCase(PATIENTS_S, (state, action) => {
      state.patientsList = action.payload.data.data;
    });
    builder.addCase(PATIENTS_F, (state, action) => {
      state.patientsList = [];
    });

    //medications
    builder.addCase(MEDICATIONS_S, (state, action) => {
      state.medicationsList = action.payload.data;
    });
    builder.addCase(MEDICATIONS_F, (state, action) => {
      state.medicationsList = [];
    });

    //patientaddress
    builder.addCase(ADDRESS_P_S, (state, action) => {
      state.patientAddress = action.payload.data;
    });
    builder.addCase(ADDRESS_P_F, (state, action) => {
      state.patientAddress = [];
    });

    //Add
    builder.addCase(SHIPMENT_ADD_S, (state, action) => {
      state.shipmentAdded = true;
    });
    builder.addCase(SHIPMENT_ADD_F, (state, action) => {
      state.shipmentAdded = false;
    });

    //Edit
    builder.addCase(SHIPMENT_EDIT_S, (state, action) => {
      state.shipmentUpdated = true;
    });
    builder.addCase(SHIPMENT_EDIT_F, (state, action) => {
      state.shipmentUpdated = false;
    });

    //Delete
    builder.addCase(SHIPMENT_DELETE_S, (state, action) => {
      state.shipmentDeleted = true;
    });
    builder.addCase(SHIPMENT_DELETE_F, (state, action) => {
      state.shipmentDeleted = false;
    });
  },
});

export const { loaderChange } = shipmentSlice.actions;
export default shipmentSlice.reducer;

// ENV CONSTANTS
export const { REACT_APP_API_BASE: API_BASE } = process.env;
export const { REACT_APP_IMAGE_BASE: API_IMAGE_BASE } = process.env;
export const { REACT_APP_NAME: APP_NAME } = process.env;

// LOCALSTORAGE KEYNAME
export const LS_USER = `user${APP_NAME}`;
export const LS_AUTHTOKEN = `authToken${APP_NAME}`;

// TYPES FOR REDUCER

//Login
export const LOGIN_S = `LOGIN_S`;
export const LOGIN_F = `LOGIN_F`;

export const FORGOT_P_S = `FORGOT_P_S`;
export const FORGOT_P_F = `FORGOT_P_F`;

// Logout
export const LOGOUT_S = `LOGOUT_S`;
export const LOGOUT_F = `LOGOUT_F`;

//Change Password
export const CHANGE_PWD_S = `CHANGE_PWD_S`;
export const CHANGE_PWD_F = `CHANGE_PWD_F`;

// Dashboard
export const DASHBOARD_S = `DASHBOARD_S`;
export const DASHBOARD_F = `DASHBOARD_F`;

// Article
export const ARTICLE_LIST_S = `ARTICLE_LIST_S`;
export const ARTICLE_LIST_F = `ARTICLE_LIST_F`;

export const ARTICLE_GET_S = `ARTICLE_GET_S`;
export const ARTICLE_GET_F = `ARTICLE_GET_F`;

export const ARTICLE_ADD_S = `ARTICLE_ADD_S`;
export const ARTICLE_ADD_F = `ARTICLE_ADD_F`;

export const ARTICLE_EDIT_S = `ARTICLE_EDIT_S`;
export const ARTICLE_EDIT_F = `ARTICLE_EDIT_F`;

export const ARTICLE_DELETE_S = `ARTICLE_DELETE_S`;
export const ARTICLE_DELETE_F = `ARTICLE_DELETE_F`;

// Shipment
export const SHIPMENT_LIST_S = `SHIPMENT_LIST_S`;
export const SHIPMENT_LIST_F = `SHIPMENT_LIST_F`;

export const SHIPMENT_DELETE_S = `SHIPMENT_DELETE_S`;
export const SHIPMENT_DELETE_F = `SHIPMENT_DELETE_F`;

export const SHIPMENT_EDIT_S = `SHIPMENT_EDIT_S`;
export const SHIPMENT_EDIT_F = `SHIPMENT_EDIT_F`;

export const SHIPMENT_ADD_S = `SHIPMENT_ADD_S`;
export const SHIPMENT_ADD_F = `SHIPMENT_ADD_F`;

export const SHIPMENT_GET_S = `SHIPMENT_GET_S`;
export const SHIPMENT_GET_F = `SHIPMENT_GET_F`;

// drop down
export const PATIENTS_S = `PATIENTS_S`;
export const PATIENTS_F = `PATIENTS_F`;

export const MEDICATIONS_S = `MEDICATIONS_S`;
export const MEDICATIONS_F = `MEDICATIONS_F`;

export const ADDRESS_P_S = `ADDRESS_P_S`;
export const ADDRESS_P_F = `ADDRESS_P_F`;

// API ENDPOINTS

//Login
export const API_LOGIN = `auth/login`;
export const API_FORGOT_PWD = `auth/forgotPassword`;

//Log out
export const API_LOGOUT = `api/logout`;
export const API_CHANGE_PWD = `api/changePassword`;

//dashboard
export const API_DASHBOARD = `api/dashboard`;

//Article
export const API_ARTICLE_LIST = `api/getArticleList`;
export const API_GET_ARTICLE = `api/getArticleDetail`;

export const API_ADD_ARTICLE = `api/addArticle`;
export const API_EDIT_ARTICLE = `api/updateArticle`;
export const API_ARTICLE_DELETE = `api/deleteArticle`;

//Shipment
export const API_SHIPMENT_LIST = `api/getShipment`;
export const API_GET_SHIPMENT = `api/getShipmentDetail`;

// drop down api list
export const API_PATIENTS = `api/getApprovedPatientList`;
export const API_MEDICATIONS = `api/getAllMedication`;
export const API_PATIENTS_ADDRESS = `api/getPatientAddress`;

//Add
export const API_ADD_SHIPMENT = `api/addShipment`;
export const API_EDIT_SHIPMENT = `api/updateShipment`;

// delete
export const API_DELETE_SHIPMENT = `api/deleteShipment`;

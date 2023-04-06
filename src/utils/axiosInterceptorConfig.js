import { store } from "../Redux/store";
import { LOGIN_F, LS_AUTHTOKEN } from "../constants";
import { instance } from "./axiosConfig";

instance.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem(LS_AUTHTOKEN));
  if (token) {
    req.headers.Authorization = token;
  }
  console.log("interceptor request", req);
  return req;
});

instance.interceptors.response.use(null, (err) => {
  if (err.response) {
    console.log("response", err.response);
    if (err.response.status === 403) {
      store.dispatch({ type: LOGIN_F });
      return Promise.reject(err);
    } else {
      return Promise.reject(err);
    }
  } else if (err.request) {
    return Promise.reject({
      response: {
        data: {
          message: "Something went wrong, Please try again later!!!",
        },
      },
    });
  }
});
export default instance;

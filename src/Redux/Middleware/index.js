import axios from "axios";
import { API_BASE } from "../../constants";
import { loaderChange } from "../AuthSlice";
import instance from "../../utils/axiosInterceptorConfig";

const reduxApiMiddleware = (store) => (next) => (action) => {
  if (next) next(action);

  const { type, payload } = action;

  if (type === "API") {
    const {
      url,
      data,
      success,
      error,
      hideLoader = false,
      method = "get",
    } = payload;

    if (!hideLoader) store.dispatch(loaderChange(true));
    return instance({
      method,
      url,
      data,
    })
      .then((res) => {
        console.log("res", res);
        store.dispatch(loaderChange(false));

        if (success) store.dispatch(success(res.data));

        return Promise.resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(loaderChange(false));

        if (error) store.dispatch(error(err.response?.data));

        return Promise.reject(err.response?.data);
      });
  }
};

export default reduxApiMiddleware;

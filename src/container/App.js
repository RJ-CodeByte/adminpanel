import React, { Suspense } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../Redux/store";
import Routes from "./routes";
import Loader from "../components/common/loader";
import { setupAxios } from "../utils";
import { ErrorBoundary } from "../components/Error";

const { PUBLIC_URL } = process.env;

setupAxios(axios, store);

const AppContainer = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <Suspense fallback={<Loader isSuspense />}>
        <Loader>
          <BrowserRouter basename={PUBLIC_URL}>
            <Routes />
          </BrowserRouter>
        </Loader>
      </Suspense>
    </Provider>
  </ErrorBoundary>
);

export default AppContainer;

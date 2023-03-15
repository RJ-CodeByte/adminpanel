import { configureStore } from "@reduxjs/toolkit";
import reduxApiMiddleware from "./Middleware";
import thunk from "redux-thunk";
import AuthSlice from "./AuthSlice";
import DashboardSlice from "./DashboardSlice";
import ArticleSlice from "./ArticleSlice";
import ShipmentSlice from "./ShipmentSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    dashboard: DashboardSlice,
    article: ArticleSlice,
    shipment: ShipmentSlice,
    // user: UserSlice,
    // product: ProductSlice,
    // Album: AlbumSlice,
  },
  middleware: [thunk, reduxApiMiddleware],
});

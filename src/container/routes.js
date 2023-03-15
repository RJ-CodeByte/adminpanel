import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/auth";

const Layout = lazy(() => import("../components/layout"));
const SignIn = lazy(() => import("../pages/SignIn"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const ForgetPassword = lazy(() => import("../pages/SignIn/ForgetPassword"));
const ArticleManagement = lazy(() => import("../pages/ArticleManagment"));
const AddArticle = lazy(() => import("../pages/ArticleManagment/Add"));
const EditArticle = lazy(() => import("../pages/ArticleManagment/Edit"));
const Shipment = lazy(() => import("../pages/Shipment"));
const AddShipment = lazy(() => import("../pages/Shipment/Add"));
const EditShipment = lazy(() => import("../pages/Shipment/Edit"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/changePassword" element={<ChangePassword />} />

        <Route path="/article-management">
          <Route index element={<ArticleManagement />} />
          <Route path="add" element={<AddArticle />} />
          <Route path="edit/:id" element={<EditArticle />} />
        </Route>

        <Route path="/add-Shipment">
          <Route index element={<Shipment />} />
          <Route path="add" element={<AddShipment />} />
          <Route path="edit/:id" element={<EditShipment />} />
        </Route>

        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Routing;

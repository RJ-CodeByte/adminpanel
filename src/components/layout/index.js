import React, { lazy } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import("./header"));
const Footer = lazy(() => import("./footer"));

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

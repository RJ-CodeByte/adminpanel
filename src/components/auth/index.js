import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log("logged in", isLoggedIn);
    if (!isLoggedIn) navigate("/signin", { replace: true });
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
};

export default AuthGuard;

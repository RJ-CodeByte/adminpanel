import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_F } from "../../../constants";
import "./header.scss";
import { logOutAction } from "../../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Header = () => {
  // const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const onLogout = () => {
    console.log(userData);
    const AuthToken = userData.accessToken;
    // dispatch({ type: LOGIN_F })
    dispatch(logOutAction(AuthToken))
      .then((res) => console.log(res))
      .catch((err) => alert(err?.message || "Please try agian!"));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Header</h2>
        <h3>
          <Link to="/">Home</Link>
        </h3>
        <div style={{ padding: 10 }}>
          <button style={{ margin: 10 }} type="button" onClick={onLogout}>
            Logout
          </button>
          <Link to="/changePassword" style={{ fontFamily: "RRO" }}>
            Change Password
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Header;

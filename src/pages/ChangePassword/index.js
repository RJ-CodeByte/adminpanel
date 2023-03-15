import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./changePassword.scss";
import { useDispatch, useSelector } from "react-redux";

import CustomLoader from "../../components/common/loader/CustomLoader";
import SearchInput from "../../components/common/SearchInput";
import "./../../scss/input.scss";
import { changePwdAction, loaderChange } from "../../Redux/AuthSlice";
import { RenderInput } from "../../components/common/FormField";
import { useForm } from "react-hook-form";

const MyAccount = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    dispatch(loaderChange(true));
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(loaderChange(false)), 1000);
  }, [userData]);

  const onSubmit = (data) => {
    console.log("data", data);
    if (data) {
      // handleClick();
      // let data = {
      //   currentPassword: "1234567",
      //   newPassword: "123456",
      //   repeatPassword: "123456",
      // };
      const { oldpassword, newpassword, repeatpassword } = data;
      let pwdData = {
        currentPassword: oldpassword,
        newPassword: newpassword,
        repeatPassword: repeatpassword,
      };
      dispatch(changePwdAction(pwdData))
        .then((res) => alert(res.message))
        .catch((err) => alert(err?.message || "Please try agian!"));
    }
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Change Password</h2>
      <br />
      <h3 style={{ textAlign: "center" }}>
        <Link to="/dashboard">Go to Dashboard</Link>
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flexDirection: "column",
            height: "100vh",
            display: "flex",
          }}
        >
          <RenderInput
            labelName={"Old Password"}
            style={{ marginLeft: 20 }}
            name="oldPassword"
            id="oldPassword"
            type="password"
            register={{
              ...register("oldpassword", {
                required: "required",
                minLength: 6,
              }),
            }}
            // onChange={(e) => handleOnchange(e)}
            errors={errors}
            placeholder="password"
          />
          <RenderInput
            labelName={"New Password"}
            style={{ marginLeft: 20 }}
            name="newPassword"
            id="newPassword"
            type="password"
            register={{
              ...register("newpassword", {
                required: "required",
                minLength: 6,
              }),
            }}
            // onChange={(e) => handleOnchange(e)}
            errors={errors}
            placeholder="password"
          />
          <RenderInput
            labelName={"Repeat Password"}
            style={{ marginLeft: 20 }}
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            register={{
              ...register("repeatpassword", {
                required: "required",
                minLength: 6,
                validate: {
                  passwordEqual: (value) =>
                    value === getValues().newpassword ||
                    "Both password need to be the same",
                },
              }),
            }}
            // onChange={(e) => handleOnchange(e)}
            errors={errors}
            placeholder="password"
          />
          <input type="submit" value="Change Password" />
        </form>
      </div>
    </>
  );
};

export default MyAccount;

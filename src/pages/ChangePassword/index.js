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
import { ToastContainer, toast } from "react-toastify";

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
    mode: "all",
  });

  useEffect(() => {
    dispatch(loaderChange(true));
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(loaderChange(false)), 1000);
  }, [userData]);
  console.log(errors);
  const onSubmit = (data) => {
    console.log("data", data);
    if (data) {
      const { oldpassword, newpassword, repeatpassword } = data;
      let pwdData = {
        currentPassword: oldpassword,
        newPassword: newpassword,
        repeatPassword: repeatpassword,
      };
      dispatch(changePwdAction(pwdData))
        .then((res) => toast(res.message))
        .catch((err) => alert(err?.message || "Please try agian!"));
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-self-center">
          <div className="card p-5 w-50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="col-sm-12 card-title">Change Password</h4>
              <div className="col-md-8">
                <RenderInput
                  name="oldpassword"
                  type="password"
                  register={{
                    ...register("oldpassword", {
                      required: "required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    }),
                  }}
                  errors={errors?.oldpassword}
                  placeholder="Old password"
                />
              </div>
              {/* {errors?.oldpassword?.message} */}
              <div className="col-md-8">
                <RenderInput
                  name="newpassword"
                  type="password"
                  register={{
                    ...register("newpassword", {
                      required: "required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    }),
                  }}
                  errors={errors?.newpassword}
                  placeholder="password"
                />
              </div>
              <div className="col-md-8">
                <RenderInput
                  name="repeatpassword"
                  type="password"
                  register={{
                    ...register("repeatpassword", {
                      required: "required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                      validate: {
                        passwordEqual: (value) =>
                          value === getValues().newpassword ||
                          "Both password need to be the same",
                      },
                    }),
                  }}
                  errors={errors?.repeatpassword}
                  placeholder="password"
                />
              </div>
              <div className="col-md-12 mt-4">
                <input type="submit" value="Change Password" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;

import React, { useState } from "react";
import {
  RenderInput,
  handleEmailValidation,
} from "../../../components/common/FormField";
import { useForm } from "react-hook-form";
import { forgetPwdAction } from "../../../Redux/AuthSlice";
import { useDispatch } from "react-redux";

export default function ForgetPassword() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    console.log("data", data);
    if (data) {
      const { email } = data;
      let pwdData = {
        email: email,
      };
      dispatch(forgetPwdAction(pwdData))
        .then((res) => alert(res.message))
        .catch((err) => alert(err?.message || "Please try agian!"));
    }
  };

  return (
    <>
      <div className="row vh-100">
        <div className="col-12 d-flex  justify-content-center align-self-center">
          <div className="card p-5 w-50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="col-sm-12 card-title">In ForgetPassword</h4>

              <div className="col-md-4">
                <RenderInput
                  name="email"
                  type="text"
                  register={{
                    ...register("email", {
                      required: "required",
                      validate: (v) => handleEmailValidation(v, errors.email),
                    }),
                  }}
                  errors={errors?.email}
                  placeholder="Email"
                />
              </div>
              <div className="col-md-12 mt-4">
                <input type="submit" value={"Forgot Password"} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

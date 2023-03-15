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
    clearErrors,
  } = useForm({
    mode: "onBlur",
  });

  const [email, setEmail] = useState();

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

  const handleOnchange = (e) => {
    // console.log("formdata", e);
    if (e.target.name == "email") {
      if (e.target.value != "") {
        setEmail(e.target.value);
        // clearErrors(["email"]);
      }
    }
  };

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>In SignIn</h2>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
          <br />
          <RenderInput
            labelName={"Email"}
            style={{ marginLeft: 20 }}
            name="email"
            type="text"
            register={{
              ...register("email", {
                required: "required",
                validate: () => handleEmailValidation(email, errors),
              }),
            }}
            onChange={(e) => handleOnchange(e)}
            errors={errors}
            placeholder="Email"
          />
          <input type="submit" value={"Forgot Password"} />
        </form>
      </div>
    </>
  );
}

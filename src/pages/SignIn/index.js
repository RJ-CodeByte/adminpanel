import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/AuthSlice";
import "./signin.scss";
import {
  CheckBoxGroup,
  RadioButton,
  RadioButtonGroup,
  RenderInput,
  Select,
  handleEmailValidation,
} from "../../components/common/FormField";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  console.log("clear", errors);

  // console.log(errors);

  const handleClick = (data) => {
    // let requestPayload = {
    //   email: "admin.gvb@yopmail.com",
    //   password: "123456",
    // };
    let requestPayload = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginAction(requestPayload))
      .then((res) => navigate("/dashboard"))
      .catch((err) => toast(err?.message || "Please try agian!"));
  };

  const onSubmit = (data) => {
    console.log("yooo");
    console.log("data", data);
    if (data) {
      handleClick(data);
    }
  };

  // const handleOnchange = (e) => {
  //   if (e.target.name == "email") {
  //     if (e.target.value != "") {
  //       setEmail(e.target.value);
  //       // clearErrors(["email"]);
  //     }
  //   }
  //   if (e.target.name == "password") {
  //     if (e.target.value != "") {
  //       setPassword(e.target.value);
  //       // clearErrors(["password"]);
  //     }
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div className="row vh-100">
        <div className="col-12 d-flex justify-content-center align-self-center">
          <div className="card p-5 w-50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="col-sm-12 card-title">In SignIn</h4>
              <div className="col-md-4">
                <RenderInput
                  labelName={"Email"}
                  name="email"
                  type="text"
                  register={{
                    ...register("email", {
                      required: "required",
                      validate: (v) => handleEmailValidation(v, errors?.email),
                    }),
                  }}
                  errors={errors?.email}
                  placeholder="Email"
                />
              </div>

              <div className="col-md-4">
                <RenderInput
                  labelName={"Password"}
                  placeholder={"Password"}
                  name="password"
                  id="signinPwd"
                  type="password"
                  register={{
                    ...register("password", {
                      required: "required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    }),
                  }}
                  errors={errors?.password}
                />
              </div>
              <div className="row mt-2">
                <div className="col-md-2" />
                <div className="col-md-8 align-self-end">
                  <Link to="/forgetPassword">Forget Password?</Link>
                </div>
              </div>

              {/* <div className="col-md-12 mt-4"> */}
              <input name="submit" type="submit" />
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

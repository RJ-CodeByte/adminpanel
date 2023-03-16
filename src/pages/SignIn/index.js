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

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    return () => {};
  }, []);
  console.log(errors);

  const handleClick = () => {
    // let requestPayload = {
    //   email: "admin.gvb@yopmail.com",
    //   password: "123456",
    // };
    let requestPayload = {
      email: email,
      password: password,
    };

    dispatch(loginAction(requestPayload))
      .then((res) => navigate("/dashboard"))
      .catch((err) => alert(err?.message || "Please try agian!"));
  };

  const onSubmit = (data) => {
    // console.log("data", data);
    if (data) {
      handleClick();
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
    if (e.target.name == "password") {
      if (e.target.value != "") {
        setPassword(e.target.value);
        // clearErrors(["password"]);
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
          <br />
          <RenderInput
            labelName={"Email"}
            name="email"
            type="text"
            style={{ marginLeft: 32 }}
            register={{
              ...register("email", {
                required: "required",
                onChange: (e) => {
                  console.log("error", e);
                },
                validate: () => handleEmailValidation(email, errors),
              }),
            }}
            onChange={(e) => handleOnchange(e)}
            errors={errors}
            placeholder="Email"
          />

          <RenderInput
            labelName={"Password"}
            placeholder={"Password"}
            name="password"
            id="signinPwd"
            type="password"
            style={{ marginLeft: 10 }}
            register={{
              ...register("password", {
                required: "required",
                // minLength: 6,
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              }),
            }}
            onChange={(e) => handleOnchange(e)}
            errors={errors}
          />
          <span style={{ textAlign: "end", padding: 5 }}>
            <Link to="/forgetPassword">Forget Password?</Link>
          </span>
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default SignIn;

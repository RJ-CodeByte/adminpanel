import React from "react";

//email error handling
const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const handleEmailValidation = (email, errors) => {
  console.log("ValidateEmail was called with", email);

  const isValid = isValidEmail(email);

  const validityChanged =
    (errors.email && isValid) || (!errors.email && !isValid);
  if (validityChanged) {
    console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
  }

  return isValid;
};

const errorMessage = (errors) => {
  if (errors) {
    if (errors?.type == "required") {
      return <span style={{ color: "#e55353" }}>{errors?.message}</span>;
    }
    if (errors?.type == "validate") {
      return <span style={{ color: "#e55353" }}>invalid email</span>;
    }
    if (
      errors?.type == "minLength" &&
      (errors?.ref?.id == "signinPwd" ||
        errors?.ref?.id == "repeatPassword" ||
        errors?.ref?.id == "newPassword" ||
        errors?.ref?.id == "oldPassword")
    ) {
      return (
        <span style={{ color: "#e55353" }}>Minimum 6 characters required</span>
      );
    }
    if (errors?.ref?.id == "addArticle" || errors?.ref?.id == "trackurl") {
      return <span style={{ color: "#e55353" }}>{errors.message}</span>;
    }
    if (errors?.type == "passwordEqual") {
      return <span style={{ color: "#e55353" }}>{errors?.message}</span>;
    }
  }
};

//basic input component
export const RenderInput = ({
  name,
  labelName = "",
  type = "text",
  containerClass,
  placeholder,
  outerStyle = true,
  register,
  errors,
  onChange,
  labelStyle,
  ...props
}) => {
  // const shortenedLabel = name.toLowerCase().replace(/\s+/g, "");
  // console.log(shortenedLabel, errors);
  return (
    <div
      className={containerClass}
      style={
        outerStyle
          ? {
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }
          : {}
      }
    >
      <div style={outerStyle ? { margin: 5 } : {}}>
        <label style={labelStyle}>{labelName}</label>
        {/* <input type={type} {...props} className={inputClass} name={name} /> */}
        <input
          type={type}
          {...props}
          {...register}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      {name && errors ? errorMessage(errors[name]) : ""}
    </div>
  );
};

//drop down button component
export const Select = React.forwardRef(
  ({ onChange, onBlur, name, label, options = [{}], errors }, ref) => (
    <div style={{ flexDirection: "row", marginBlock: 20 }}>
      <label style={{ marginRight: 10 }}>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        {options.map((obj) => (
          <option key={obj?.value} value={obj?.value}>
            {obj?.name}
          </option>
        ))}
      </select>
      {errors && errors["fruits"] && <span>*{label} is required</span>}
    </div>
  )
);

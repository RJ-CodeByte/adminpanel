import { DatePicker, Input } from "antd";
import React from "react";

//email error handling
const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

export const handleEmailValidation = (email, errors) => {
  // console.log("ValidateEmail was called with", email, errors);

  const isValid = isValidEmail(email);

  const validityChanged = (errors && isValid) || (!errors && !isValid);
  if (validityChanged) {
    // console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
  }

  return isValid;
};

const errorMessage = (errors) => {
  if (errors) {
    if (errors?.type == "validate") {
      return <span style={{ color: "#e55353" }}>invalid email</span>;
    }
    return <span style={{ color: "#e55353" }}>{errors?.message}</span>;
  }
};

//basic input component
export const RenderInput = ({
  labelName = "",
  type = "text",
  placeholder,
  outerStyle = true,
  errors,
  labelStyle,
  register,
}) => {
  // const shortenedLabel = name.toLowerCase().replace(/\s+/g, "");
  // console.log(shortenedLabel, errors);
  return (
    <>
      <label className="inputEmail4 mb-2" style={labelStyle}>
        {labelName}
      </label>
      <input
        className="form-control"
        type={type}
        // {...props}
        {...register}
        placeholder={placeholder}
      />
      {errors ? errorMessage(errors) : ""}
    </>
  );
};

//drop down button component
export const DropDown = React.forwardRef(
  (
    {
      handleChange,
      onBlur,
      name,
      label,
      options = [{ label: "Select", value: "" }],
      errors,
      // ...rest
    },
    ref
  ) => (
    <>
      <label className="inputEmail4 mb-2">{label}</label>
      <select
        className="form-select"
        name={name}
        ref={ref}
        onChange={handleChange}
        onBlur={onBlur}
      >
        {options.map((obj) => (
          <option key={obj?.value} value={obj?.value}>
            {obj?.label}
          </option>
        ))}
      </select>
      {errors ? errorMessage(errors) : ""}
    </>
  )
);

export const RenderDatePicker = ({
  value,
  format = "MM/DD/YYYY",
  name,
  onChange,
  labelName,
  errors,
  disabledDate,
  register,
}) => {
  return (
    <div>
      <label className="inputEmail4 mb-2">{labelName}</label>
      <DatePicker
        className="form-control"
        value={value}
        allowClear={false}
        format={format}
        name={name}
        onChange={onChange}
        // style={{ margin: 10 }}
        disabledDate={disabledDate}
      />
      <RenderInput
        value={value}
        outerStyle={false}
        type="hidden"
        name={name}
        register={register}
        errors={errors}
      />
    </div>
  );
};

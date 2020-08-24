import React from "react";
import "./style.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="form--row">
      {label && <label className="label">{label}</label>}
      <input className="input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;

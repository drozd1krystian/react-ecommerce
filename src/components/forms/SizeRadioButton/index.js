import React from "react";
import "./style.scss";

const SizeRadioButton = ({ label, ...otherProps }) => {
  return (
    <div className="size">
      <input
        type="radio"
        className="size__radio"
        name="size"
        id={`size-${label}`}
        {...otherProps}
      />
      <label className="size__label" htmlFor={`size-${label}`}>
        <span className="field">EU {label}</span>
      </label>
    </div>
  );
};

export default SizeRadioButton;

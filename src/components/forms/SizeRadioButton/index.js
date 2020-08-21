import React from "react";
import "./style.scss";

const SizeRadioButton = ({ label, ...otherProps }) => {
  return (
    <div className="size">
      <input
        type="radio"
        className="radio"
        name="size"
        id={`size-${label}`}
        {...otherProps}
      />
      <label className="radio-label" htmlFor={`size-${label}`}>
        <span>EU {label}</span>
      </label>
    </div>
  );
};

export default SizeRadioButton;

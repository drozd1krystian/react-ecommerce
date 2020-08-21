import React from "react";
import "./style.scss";

const CheckBox = ({ label, handleChange, ...otherProps }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={label}
        onChange={handleChange}
        {...otherProps}
      />
      {label && (
        <label htmlFor={label} className="label">
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;

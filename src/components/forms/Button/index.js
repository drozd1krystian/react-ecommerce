import React from "react";
import "./style.scss";

const Button = ({ handleChange, ...otherProps }) => {
  return (
    <button
      type="submit"
      onClick={handleChange}
      {...otherProps}
      className="submit"
    ></button>
  );
};

export default Button;

import React from "react";
import "./style.scss";

const Button = ({ handleChange, ...otherProps }) => {
  return (
    <button
      type="submit"
      onClick={handleChange}
      {...otherProps}
      className="btn btn--submit"
    ></button>
  );
};

export default Button;

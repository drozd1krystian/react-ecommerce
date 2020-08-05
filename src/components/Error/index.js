import React from "react";
import "./style.scss";

const Error = ({ errors, ...otherProps }) => {
  return (
    <ul className="errors">
      {errors.map((error, index) => {
        return <li key={index}>{error}</li>;
      })}
    </ul>
  );
};

export default Error;

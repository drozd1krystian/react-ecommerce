import React from "react";
import "./style.scss";

const Registration = (props) => {
  return (
    <div className="page">
      <form className="form">
        <label for="email">Email</label>
        <input type="email" id="email" />

        <label for="pass">Password</label>
        <input type="password" id="pass" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;

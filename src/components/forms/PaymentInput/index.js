import React from "react";
import "./style.scss";

const PaymentInput = ({ label, handleChange, id, ...otherProps }) => {
  return (
    <div className="payment">
      <input
        type="radio"
        {...otherProps}
        id={id}
        className="payment__radio"
        name="payment"
        value={id}
        onClick={handleChange}
      />
      <label className="payment__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default PaymentInput;

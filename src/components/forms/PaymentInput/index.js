import React from "react";
import "./style.scss";

const PaymentInput = ({ label, handleChange, id, ...otherProps }) => {
  return (
    <div className="payment">
      <input
        type="radio"
        {...otherProps}
        id={id}
        className="payment-radio"
        name="payment"
        value={id}
        onClick={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default PaymentInput;

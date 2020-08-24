import React from "react";
import "./style.scss";

const CheckoutItem = ({ product, ...otherProps }) => {
  return (
    <div className="checkout__item">
      <div className="row row--flex">
        <span className="field">
          {product.amount}x {product.productName}
        </span>
        <span className="field">${product.salePrice.toFixed(2)}</span>
      </div>
      <div className="row">Size: {product.size}</div>
    </div>
  );
};

export default CheckoutItem;

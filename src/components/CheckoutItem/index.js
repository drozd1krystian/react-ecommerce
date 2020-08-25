import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const CheckoutItem = ({ product, ...otherProps }) => {
  return (
    <div className="checkout__item">
      <div className="row row--flex">
        <Link to={`product/${product.productId}`}>
          <span className="field">
            {product.amount}x {product.productName}
          </span>
        </Link>
        <span className="field">${product.salePrice.toFixed(2)}</span>
      </div>
      <div className="row">Size: {product.size}</div>
    </div>
  );
};

export default CheckoutItem;

import React from "react";
import "./style.scss";

const CheckoutItem = ({ product, ...otherProps }) => {
  return (
    <div className="checkout-item">
      <div className="product-name">
        <div>
          {product.amount}x {product.productName}
        </div>
        <div>${product.salePrice.toFixed(2)}</div>
      </div>
      <div className="size">Size: {product.size}</div>
    </div>
  );
};

export default CheckoutItem;

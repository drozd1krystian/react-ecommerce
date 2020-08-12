import React from "react";
import "./style.scss";

const CartItem = ({ product, ...otherProps }) => {
  return (
    <div className="cart-item p1">
      <div className="photo">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="img"
        />
      </div>
      <div className="description">
        <p>{product.productName}</p>
        <p>Amount: {product.amount}</p>
        <p>Size: {product.size}</p>
        <p>Price: {product.salePrice * product.amount}$</p>
      </div>
    </div>
  );
};

export default CartItem;

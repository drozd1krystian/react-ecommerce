import React from "react";
import "./style.scss";
import { Route } from "react-router-dom";

const CartItem = ({ product }) => {
  return (
    <div className="item p1">
      <div className="item__photo">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="photo__img"
        />
      </div>
      <div className="item__description">
        <Route to={`product/${product.productId}`}>
          <p className="field">{product.productName}</p>
        </Route>
        <p className="field">Amount: {product.amount}</p>
        <p className="field">Size: {product.size}</p>
        <p className="field">
          Price: {(product.salePrice * product.amount).toFixed(2)}$
        </p>
      </div>
    </div>
  );
};

export default CartItem;

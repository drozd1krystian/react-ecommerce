import React from "react";
import "./style.scss";

//icons
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const CartItem = ({ product, ...otherProps }) => {
  const history = useHistory();

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
        {history.location === "/cart" && (
          <div className="amount-input">
            <span>
              <AiOutlineMinus />
            </span>
            <input type="number" value={product.amount} disabled />
            <span>
              <AiOutlinePlus />
            </span>
          </div>
        )}

        <p>Size: {product.size}</p>
        <p>Price: {product.salePrice * product.amount}$</p>
      </div>
    </div>
  );
};

export default CartItem;

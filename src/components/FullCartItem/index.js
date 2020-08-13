import React from "react";
import "./style.scss";

import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import FormInput from "../forms/FormInput";

const FullCartItem = ({ product }) => {
  return (
    <div className="p1 full-cart-item">
      <div className="photo">
        <img
          src={product.images[0]}
          alt={product.productName}
          className="img"
        />
      </div>
      <div className="full-cart-description">
        <span>{product.productName}</span>
        <span>Size: {product.size}</span>
        <span className="icon">
          <FiTrash2 />
        </span>
      </div>
      <div className="item-total">
        <div>
          <p>{product.salePrice}$</p>
        </div>
        <div className="change-amount">
          <span>
            <AiOutlineMinus />
          </span>
          <div>{product.amount}</div>
          <span>
            <AiOutlinePlus />
          </span>
        </div>
        <div>
          <p>Total: {(product.salePrice * product.amount).toFixed(2)}$</p>
        </div>
      </div>
    </div>
  );
};

export default FullCartItem;

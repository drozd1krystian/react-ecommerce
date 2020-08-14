import React from "react";
import "./style.scss";

import { FiTrash2 } from "react-icons/fi";
import { BsPlus } from "react-icons/bs";
import { FiMinus } from "react-icons/fi";

import {
  inscreaseAmount,
  decreaseAmount,
  removeProduct,
} from "../../redux/Cart/cart.actions";
import { useDispatch } from "react-redux";

const FullCartItem = ({ product, index, ...otherProps }) => {
  const dispatch = useDispatch();

  const handleAmountIncrease = () => {
    dispatch(inscreaseAmount(index));
  };

  const handleAmountDecrease = () => {
    dispatch(decreaseAmount(index));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(index));
  };

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
        <p>{product.productName}</p>
        <p>Size: {product.size}</p>
        <span className="icon" onClick={handleRemoveProduct}>
          <FiTrash2 />
        </span>
      </div>
      <div className="item-total">
        <div>
          <p>{product.salePrice}$</p>
        </div>
        <div className="change-amount">
          <span onClick={handleAmountDecrease}>
            <FiMinus />
          </span>
          <div>{product.amount}</div>
          <span onClick={handleAmountIncrease}>
            <BsPlus />
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

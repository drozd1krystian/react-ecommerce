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
import { Link } from "react-router-dom";

const FullCartItem = ({ product, index, ...otherProps }) => {
  const dispatch = useDispatch();

  const handleAmountIncrease = () => {
    dispatch(inscreaseAmount(index));
  };

  const handleAmountDecrease = () => {
    if (product.amount > 1) dispatch(decreaseAmount(index));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(index));
  };

  return (
    <div className=" full__item">
      <div className="full__item__column">
        <div className="item__photo">
          <img
            src={product.images[0]}
            alt={product.productName}
            className="photo__img"
          />
        </div>
        <div className="full__item__info">
          <Link to={`product/${product.productId}`}>
            <p className="field">{product.productName}</p>
          </Link>
          <p className="field">Size: {product.size}</p>
          <span className="field icon" onClick={handleRemoveProduct}>
            <FiTrash2 />
          </span>
        </div>
      </div>
      <div className="full__item__column full__item__column--spacing">
        <div>
          <p className="field">{product.salePrice}$</p>
        </div>
        <div className="full__item__amount">
          <span onClick={handleAmountDecrease} className="icon field--btn">
            <FiMinus />
          </span>
          <span className="field field--btn field--border">
            {product.amount}
          </span>
          <span onClick={handleAmountIncrease} className="icon field--btn">
            <BsPlus />
          </span>
        </div>
        <div>
          <p className="field--bold">
            Total: {(product.salePrice * product.amount).toFixed(2)}$
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullCartItem;

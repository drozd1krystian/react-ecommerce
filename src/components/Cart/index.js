import React from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const mapState = ({ cart }) => ({
  cart: cart.cart,
  count: cart.count,
});

const Cart = (props) => {
  const { cart, count } = useSelector(mapState);

  return (
    <div className="link-wrapper">
      <Link to="/cart" className="link">
        <span>
          <BsBag />
        </span>
        <span className="item-counter">{count}</span>
      </Link>
      <div className="data-container">
        <h2 className="p1 text-center">Basket</h2>
        {cart.map((el, index) => (
          <h3 key={index}>
            {el.productName} | {el.amount}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default Cart;

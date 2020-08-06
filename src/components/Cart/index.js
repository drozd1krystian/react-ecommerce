import React from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = (props) => {
  return (
    <div className="link-wrapper">
      <Link to="/cart" className="link">
        <span>
          <BsBag />
        </span>
        <span className="item-counter">1</span>
      </Link>
      <div className="data-container">
        <h2 className="p1 text-center">Basket</h2>
        <h3> Product 1</h3>
      </div>
    </div>
  );
};

export default Cart;

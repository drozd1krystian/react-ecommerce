import React, { useEffect, useRef } from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const mapState = ({ cart }) => ({
  cart: cart.cart,
  loading: cart.loading,
});

const Cart = (props) => {
  const { cart, loading } = useSelector(mapState);
  const cartDiv = useRef(null);

  useEffect(() => {
    const divClassList = cartDiv.current.classList;
    if (loading.isLoading) {
      divClassList.add("show");
    }
    return () => divClassList.remove("show");
  }, [loading]);

  return (
    <div className="link-wrapper" ref={cartDiv}>
      <Link to="/cart" className="link">
        <span>
          <BsBag />
        </span>
        <span className="item-counter">{cart.length}</span>
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

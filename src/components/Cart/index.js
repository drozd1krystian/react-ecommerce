import React, { useEffect, useRef } from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";

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
      {cart.length > 0 && (
        <div className="data-container">
          <h2 className="p1 text-center small-header">Basket</h2>
          <div className="cart-items">
            {cart.map((el, index) => (
              <CartItem product={el} key={`cartItem-${index}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

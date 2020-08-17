import React, { useEffect, useRef } from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";

const mapState = ({ cart }) => ({
  cart: cart.cart,
  loading: cart.loading,
});

const Cart = (props) => {
  const { cart, loading } = useSelector(mapState);
  const cartDiv = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const divClassList = cartDiv.current.classList;
    if (loading.isLoading) {
      divClassList.add("show");
    }
    return () => divClassList.remove("show");
  }, [loading]);

  const cartQuantity = cart
    .map((el) => el.amount)
    .reduce((acc, current) => acc + current);

  return (
    <div className="link-wrapper" ref={cartDiv}>
      <Link to="/cart" className="link">
        <span>
          <BsBag />
        </span>
        <span className="item-counter">{cartQuantity}</span>
      </Link>
      {cart.length > 0 && location.pathname !== "/cart" && (
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

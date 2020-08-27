import React, { useEffect, useRef } from "react";
import "./style.scss";

import { BsBag } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import Button from "../forms/Button";

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

  const cartQuantity =
    cart.length > 0
      ? cart.map((el) => el.amount).reduce((acc, current) => acc + current)
      : 0;

  return (
    <li className="link__wrapper" ref={cartDiv}>
      <Link
        to="/cart"
        className={
          location.pathname === "/cart"
            ? "link link--border link--current"
            : "link link--border"
        }
      >
        <span className="icon">
          <BsBag />
        </span>
        <span className="counter">{cartQuantity}</span>
      </Link>
      {cart.length > 0 && location.pathname !== "/cart" && (
        <div className="data__container">
          <h2 className="p1 text--center">Basket</h2>
          <div className="cart">
            {cart.map((el) => (
              <CartItem product={el} key={el.productId} />
            ))}
          </div>

          <Link to="/checkout">
            <Button>Check Out</Button>
          </Link>
        </div>
      )}
    </li>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";

import "./style.scss";

import { useSelector } from "react-redux";
import emptyCart from "../../assets/emptyCart.png";
import FullCartItem from "../../components/FullCartItem";
import LoadingScreen from "../../components/LoadingScreen";

import { Link } from "react-router-dom";
import Button from "../../components/forms/Button";

const mapState = ({ cart }) => ({
  cart: cart.cart,
});

const CartPage = (props) => {
  const { cart } = useSelector(mapState);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    if (cart.length > 0) {
      const value = cart
        .map((item) => item.salePrice * item.amount)
        .reduce((acc, el) => acc + el);
      setCartValue(value || 0);
    }
  }, [setCartValue, cart]);

  return (
    <div>
      <LoadingScreen />

      {cart.length > 0 && (
        <div className="content">
          <div className="cart__items">
            <h2 className=" text__center p1">Cart</h2>

            {cart.map((item, index) => (
              <FullCartItem product={item} key={item.productId} index={index} />
            ))}
          </div>
          <div className="summary">
            <h2 className=" p1 text__center">Summary</h2>
            <div className="wrap">
              <div className="summary__desc p1">
                <div className="field">
                  <span>Order value: </span>
                  <span>{(cartValue + 0.000001).toFixed(2)}$</span>
                </div>
                <div className="field">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="field summary__total">
                <span>Total</span>
                <span>{cartValue.toFixed(2)} $</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button>Check Out</Button>
            </Link>
          </div>
        </div>
      )}
      {!cart.length > 0 && (
        <div className="empty__cart">
          <img src={emptyCart} alt="Empty Cart" className="img" />
          <h1 className="text__center">Your cart is empty!</h1>
          <Link to="/" className="btn btn--light btn--round">
            <span className="text__center">Continue shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

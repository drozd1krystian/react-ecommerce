import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";

import emptyCart from "../../assets/emptyCart.png";

import CartItem from "../../components/CartItem";
import { Link } from "react-router-dom";

const mapState = ({ cart }) => ({
  cart: cart.cart,
});

const CartPage = (props) => {
  const { cart } = useSelector(mapState);

  const [cartValue, setCartValue] = useState(null);

  useEffect(() => {
    if (cart.length > 0) {
      const value = cart
        .map((item) => item.salePrice * item.amount)
        .reduce((acc, el) => acc + el);
      setCartValue(value);
    }
  });
  return (
    <div>
      {cart.length > 0 && (
        <div className="content">
          <div className="cart-items">
            <h2 className=" text-center p1">Cart</h2>
            {cart.map((item, index) => (
              <CartItem product={item} key={`item-${index}`} />
            ))}
          </div>
          <div className="summary">
            <h2 className=" p1 text-center">Summary</h2>
            <div className="wrap">
              <div className="summary-desc p1">
                <div className="field">
                  <span>Order value: </span>
                  <span>{cartValue}$</span>
                </div>
                <div className="field">
                  <span>Delivery</span>
                  <span>8.99$</span>
                </div>
                <div className="field summary-total">
                  <span>Total</span>
                  <span>{(cartValue + 8.99, 2).toFixed(2)} $</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!cart.length > 0 && (
        <div className="empty-cart">
          <img src={emptyCart} alt="empty-cart" className="img" />
          <h1 className="text-center">Your cart is empty!</h1>
          <Link to="/" className="btn btn-light">
            <span className="text-center">Continue shopping</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

import React from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { BsBag, BsListCheck } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { TiDropbox } from "react-icons/ti";

import FormInput from "../../components/forms/FormInput";
import PaymentInput from "../../components/forms/PaymentInput";
import CheckoutItem from "../../components/CheckoutItem";
import Button from "../../components/forms/Button";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../components/LoadingScreen";

import { checkOut } from "../../redux/Cart/cart.actions";
import { useEffect } from "react";
import { useState } from "react";

const mapState = ({ cart }) => ({
  cart: cart.cart,
});

const CheckoutPage = (props) => {
  const { cart } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState();

  const cartTotal =
    cart.length > 0
      ? cart
          .map((el) => el.amount * el.salePrice)
          .reduce((acc, current) => acc + current)
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkOut());
    console.log(payment);
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };

  const handleRadioInput = (e) => {
    const { value } = e.target;
    setPayment(value);
  };

  useEffect(() => {
    if (cart.length < 1) history.push("/");
  }, [cart, history]);

  return (
    <div className="column">
      <Loading />
      <div className="steps">
        <div className="step">
          <Link to="/cart">
            <span className="icon">
              <BsBag />
            </span>
          </Link>
          <p>Cart</p>
        </div>
        <div className="arrow">
          <span className="line"></span>
          <IoIosArrowForward />
        </div>
        <div className="step current">
          <span className="icon">
            <BsListCheck />
          </span>

          <p>Checkout</p>
        </div>
        <div className="arrow">
          <span className="line"></span>
          <IoIosArrowForward />
        </div>
        <div className="step">
          <span className="icon">
            <TiDropbox />
          </span>
          <p>Order Complete</p>
        </div>
      </div>
      <div className="details-wrapper">
        <form className="wrap billing" onSubmit={handleSubmit}>
          <h3 className="section-name">Billing Details</h3>
          <FormInput label="First & last mame" required />
          <FormInput label="Email" required type="email" />
          <FormInput label="Address" required />
          <div className="input-wrapper">
            <FormInput label="Postal Code" required pattern="[0-9]*" />
            <FormInput label="City" required />
          </div>

          <h3 className="section-name">Payment Method</h3>
          <PaymentInput
            label="Credit Card"
            id="creditCard"
            required
            handleChange={handleRadioInput}
          />
          <PaymentInput
            label="Paypal"
            id="paypal"
            required
            handleChange={handleRadioInput}
          />
          <PaymentInput
            label="Bank Transfer"
            id="bankTransfer"
            required
            handleChange={handleRadioInput}
          />

          <Button>Complete Your Order</Button>
        </form>
        <div className="wrap">
          <div className="checkout-summary">
            <h3 className="section-name">
              <BsBag /> Cart Summary
            </h3>
            <div className="summary-items">
              {cart.map((el, index) => (
                <CheckoutItem product={el} key={`summary-item${index}`} />
              ))}
            </div>
            <div className="checkout-total text-bold">
              <span>Subtotal: </span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

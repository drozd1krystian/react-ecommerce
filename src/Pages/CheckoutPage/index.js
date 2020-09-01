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

const mapState = ({ cart, user }) => ({
  cart: cart.cart,
  user: user.currentUser
    ? user.currentUser
    : {
        email: "",
        displayName: "",
        city: "",
        addres: "",
        postCode: "",
      },
});

const CheckoutPage = (props) => {
  const { cart, user } = useSelector(mapState);
  const history = useHistory();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("creditCard");
  const [email, setEmail] = useState(user.email || "");
  const [name, setName] = useState(user.displayName || "");
  const [address, setAddress] = useState(user.address || "");
  const [postCode, setPostCode] = useState(user.postCode || "");
  const [city, setCity] = useState(user.city || "");

  const cartTotal =
    cart.length > 0
      ? cart
          .map((el) => el.amount * el.salePrice)
          .reduce((acc, current) => acc + current)
          .toFixed(2)
      : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payment) {
      dispatch(checkOut({ cart, payment, cartTotal }));
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  };

  const handleRadioInput = (e) => {
    const { value } = e.target;
    setPayment(value);
  };

  useEffect(() => {
    if (cart.length < 1) history.push("/");
  }, [cart, history]);

  return (
    <div className="ptop">
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
      <div className="details__wrapper">
        <form className="wrap billing" onSubmit={handleSubmit}>
          <h3 className="section__name">Billing Details</h3>
          <FormInput
            label="First & Last Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            required
            placeholder=" "
          />
          <FormInput
            label="Email"
            required
            type="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <FormInput
            label="Address"
            required
            value={address}
            handleChange={(e) => setAddress(e.target.value)}
            placeholder=" "
          />
          <div className="input__wrapper">
            <FormInput
              label="Postal Code"
              required
              pattern="[0-9]*"
              value={postCode}
              handleChange={(e) => setPostCode(e.target.value)}
              placeholder=" "
            />
            <FormInput
              label="City"
              required
              value={city}
              handleChange={(e) => setCity(e.target.value)}
              placeholder=" "
            />
          </div>

          <h3 className="section__name">Payment Method</h3>
          <PaymentInput
            label="Credit Card"
            id="creditCard"
            handleChange={handleRadioInput}
            defaultChecked
          />
          <PaymentInput
            label="Paypal"
            id="paypal"
            handleChange={handleRadioInput}
          />
          <PaymentInput
            label="Bank Transfer"
            id="bankTransfer"
            handleChange={handleRadioInput}
          />

          <Button>Complete Your Order</Button>
        </form>
        <div className="wrap">
          <div className="summary">
            <h3 className="section__name">
              <BsBag /> Cart Summary
            </h3>
            <div className="summary__items">
              {cart.map((el, index) => (
                <CheckoutItem product={el} key={`${index}-${el.productId}`} />
              ))}
            </div>
            <div className="summary__total text__bold">
              <span>Subtotal: </span>
              <span>${cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

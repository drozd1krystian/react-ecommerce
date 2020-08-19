import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../SignIn/style.scss";

import { Link, useHistory } from "react-router-dom";
import FormInput from "../../components/forms/FormInput/index";
import Error from "../../components/Error/index";
import {
  resetAllAuthForms,
  signUpUserStart,
} from "../../redux/User/user.actions";
import Button from "../../components/forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErrors: user.userErrors,
});

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErrors } = useSelector(mapState);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(resetAllAuthForms());
      resetForm();
      history.push("/");
    }
  }, [currentUser, history, dispatch]);

  useEffect(() => {
    if (Array.isArray(userErrors) && userErrors.length > 0) {
      setErrors(userErrors);
    }
  }, [userErrors]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({ email, password, confirmPassword, displayName })
    );
  };

  return (
    <div className="page">
      <h2 className="heading">Sign Up</h2>

      <form className="form" onSubmit={handleFormSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          label="Email"
          handleChange={(e) => setEmail(e.target.value)}
          required
          placeHolder=" "
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          label="Password"
          handleChange={(e) => setPassword(e.target.value)}
          required
          placeHolder=" "
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          handleChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeHolder=" "
        />
        <FormInput
          type="text"
          name="name"
          value={displayName}
          label="First & Last Name"
          handleChange={(e) => setDisplayName(e.target.value)}
          required
          placeHolder=" "
        />
        <FormInput
          label="Address"
          required
          value={address}
          handleChange={(e) => setAddress(e.target.value)}
          placeHolder=" "
        />
        <div className="input-wrapper">
          <FormInput
            label="Postal Code"
            required
            pattern="[0-9]*"
            value={postCode}
            handleChange={(e) => setPostCode(e.target.value)}
            placeHolder=" "
          />
          <FormInput
            label="City"
            required
            value={city}
            handleChange={(e) => setCity(e.target.value)}
            placeHolder=" "
          />
        </div>

        <Button>Sign Up</Button>
        <p className="mt1">
          Already have an account?{" "}
          <Link to="/signin" className="decoration">
            Sign in.
          </Link>
        </p>

        <Error errors={errors} />
      </form>
    </div>
  );
};

export default SignUp;

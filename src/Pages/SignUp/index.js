import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../SignIn/style.scss";

import { Link, useHistory } from "react-router-dom";
import FormInput from "../../components/forms/FormInput/index";
import Error from "../../components/Error/index";
import { signUpUser, resetAllAuthForms } from "../../redux/User/user.actions";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signError: user.signError,
});

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signUpSuccess, signError } = useSelector(mapState);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetAllAuthForms());
      resetForm();
      history.push("/");
    }
  }, [signUpSuccess, history, dispatch]);

  useEffect(() => {
    if (Array.isArray(signError) && signError.length > 0) {
      setErrors(signError);
    }
  }, [signError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpUser(email, password, confirmPassword, displayName));
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
        />

        <FormInput
          type="password"
          name="password"
          value={password}
          label="Password"
          handleChange={(e) => setPassword(e.target.value)}
          required
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          handleChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          label="Username"
          handleChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <button type="submit">Register</button>
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

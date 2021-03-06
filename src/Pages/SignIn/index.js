import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import FormInput from "../../components/forms/FormInput/index";
import Error from "../../components/Error/index";
import { emailSignInStart } from "../../redux/User/user.actions";
import "./style.scss";
import Button from "../../components/forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErrors: user.userErrors,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErrors } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser, history]);

  useEffect(() => {
    if (Array.isArray(userErrors) && userErrors.length > 0) {
      setErrors(userErrors);
    }
  }, [userErrors]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  return (
    <div className="signin">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="p1 text--center mb1 ">Sign In</h2>
        <FormInput
          type="email"
          name="email"
          value={email}
          label="Email"
          handleChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          required
        />

        <FormInput
          type="password"
          name="email"
          value={password}
          label="Password"
          handleChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          required
        />
        <Button>Sign In</Button>
        <p className="mt1 text--center ">
          Don't have an account?{" "}
          <Link to="/signup" className="decoration">
            Sign up.
          </Link>
        </p>

        <Error errors={errors} />
      </form>
    </div>
  );
};

export default SignIn;

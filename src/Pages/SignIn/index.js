import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/forms/FormInput/index";
import "./style.scss";
import { auth } from "../../firebase/utils";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <h2 className="heading">Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          label="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          type="password"
          name="email"
          value={password}
          label="Password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <p className="mt1">
          Don't have an account?{" "}
          <Link to="/signup" className="decoration">
            Sign up.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

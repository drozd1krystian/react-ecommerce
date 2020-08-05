import React, { useState } from "react";
import "../SignIn/style.scss";
import { Link } from "react-router-dom";
import FormInput from "../../components/forms/FormInput/index";
import Error from "../../components/Error/index";

//firestore
import { auth, handleUserProfile } from "../../firebase/utils";

const SignUp = (props) => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword || password === "") {
      const err = ["Passwords Don't Match"];
      setErrors([err]);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      resetForm();
    } catch (err) {
      setErrors([err.message]);
    }
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

import React from "react";
import { connect } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import { auth } from "./../../firebase/utils";

const Header = (props) => {
  const { currentUser } = { ...props };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h2>E-commerce</h2>
        </Link>
      </div>
      {currentUser && (
        <ul className="links">
          <li className="btn-light">
            <span onClick={() => auth.signOut()}>Log Out</span>
          </li>
          <Link to="/profile" className="btn-dark link">
            <span>
              <FaRegUser />
            </span>
            <div className="cart"></div>
          </Link>
          <Link to="/cart" className="btn-dark link cart-link">
            <span>
              <BsBag />
            </span>
            <div className="cart"></div>
          </Link>
        </ul>
      )}
      {!currentUser && (
        <ul className="links">
          <li>
            <Link to="/signin" className="btn-light link">
              <span>Sign In</span>
            </Link>
          </li>
          <li>
            <Link to="/cart" className="btn-dark link cart-link">
              <span>
                <BsBag />
              </span>
              <div className="cart"></div>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);

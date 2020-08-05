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
          <li>
            <div className="link-wrapper">
              <Link to="/profile" className="link">
                <span>
                  <FaRegUser />
                </span>
                <div className="data-container">
                  <h3 className="text-center">Hello Display Name</h3>
                  <ul className="mt1">
                    <li>Your account</li>
                    <li>Your orders</li>
                  </ul>
                  <span
                    onClick={() => auth.signOut()}
                    className="btn-light mt2"
                  >
                    <span> Logout</span>
                  </span>
                </div>
              </Link>
            </div>
          </li>
          <li>
            <div className="link-wrapper">
              <Link to="/cart" className="link">
                <span>
                  <BsBag />
                </span>
                <span className="item-counter">1</span>
                <div className="data-container"></div>
              </Link>
            </div>
          </li>
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
              <div className="data-container"></div>
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

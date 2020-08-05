import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import SignIn from "../../Pages/SignIn/index";

import { auth } from "./../../firebase/utils";

const Header = (props) => {
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });

  const { currentUser } = useSelector(mapState);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h2>E-commerce</h2>
        </Link>
      </div>

      <ul className="links">
        <li>
          <div className="link-wrapper">
            <Link to={currentUser ? "/profile" : "/signin"} className="link">
              <span>
                <FaRegUser />
              </span>
            </Link>
            {currentUser && (
              <div className="data-container">
                <h3 className="text-center mt2">Hello Display Name</h3>
                <ul className="mt1">
                  <li>Your account</li>
                  <li>Your orders</li>
                </ul>
                <span
                  onClick={() => auth.signOut()}
                  className="btn-light mt2 show"
                >
                  <span> Logout</span>
                </span>
              </div>
            )}
            {!currentUser && (
              <div className="data-container">
                <SignIn />
              </div>
            )}
          </div>
        </li>
        <li>
          <div className="link-wrapper">
            <Link to="/cart" className="link">
              <span>
                <BsBag />
              </span>
              <span className="item-counter">1</span>
            </Link>
            <div className="data-container"></div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;

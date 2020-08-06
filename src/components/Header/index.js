import React from "react";
import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";

import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

import SignIn from "../../Pages/SignIn/index";
import Cart from "../Cart/index";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const signOut = () => dispatch(signOutUserStart());

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
                <span onClick={() => signOut()} className="btn-light mt2 show">
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
          <Cart />
        </li>
      </ul>
    </header>
  );
};

export default Header;

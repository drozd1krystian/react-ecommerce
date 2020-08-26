import React from "react";
import "./style.scss";

import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";

import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShop, AiOutlineClose } from "react-icons/ai";

import SignIn from "../../Pages/SignIn/index";
import Cart from "../Cart/index";
import Button from "../forms/Button";
import { useRef } from "react";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Header = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  const location = useLocation();
  const menuRef = useRef();
  const { pathname } = location;
  const signOut = () => dispatch(signOutUserStart());

  const toggleMenu = () => {
    menuRef.current.classList.toggle("active");
    if (window.innerWidth < 1024) {
      if (menuRef.current.classList.contains("active"))
        document.body.classList.add("body--fixed");
      else document.body.classList.remove("body--fixed");
    }
  };

  return (
    <header className="header">
      <div className="burger" onClick={toggleMenu}>
        <div className="line line--1"></div>
        <div className="line line--2"></div>
        <div className="line line--3"></div>
      </div>
      <ul className="links" ref={menuRef}>
        <div className="close__menu">
          <h3 className="menu__header">Menu</h3>
          <span className="close" onClick={toggleMenu}>
            <AiOutlineClose />
          </span>
        </div>
        <li className="link__wrapper" onClick={toggleMenu}>
          <Link
            to="/"
            className={pathname === "/" ? "link link--current" : "link"}
          >
            Home
          </Link>
        </li>
        <li className="link__wrapper" onClick={toggleMenu}>
          <Link
            to="/catalog"
            className={pathname === "/catalog" ? "link link--current" : "link"}
          >
            Catalog
          </Link>
        </li>
      </ul>
      <div className="logo">
        <Link to="/">
          <h2 className="logo__header">
            <AiOutlineShop /> NikeFan
          </h2>
        </Link>
      </div>
      <ul className="side__links">
        <li className="link__wrapper">
          <Link
            to={currentUser ? "/profile" : "/signin"}
            className={
              pathname === "/signin" ||
              pathname === "/signup" ||
              pathname === "/profile"
                ? "link link--border link--current"
                : "link link--border"
            }
          >
            <span>
              <FaRegUser />
            </span>
          </Link>
          {currentUser && (
            <div className="data__container">
              <h3 className="text--center mt2">
                Hello {currentUser.displayName}
              </h3>
              <ul className="mt1 profile">
                <li className="field">
                  <Link to="/profile">Your account</Link>
                </li>
              </ul>
              <Button onClick={signOut}>Logout</Button>
            </div>
          )}
          {!currentUser && (
            <div className="data__container">
              <SignIn />
            </div>
          )}
        </li>
        <li>
          <Cart />
        </li>
      </ul>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import "./style.scss";

import {
  AiOutlineTwitter,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const [expandList, setExpandList] = useState({
    1: false,
    2: false,
    3: false,
  });

  const handleExpandList = (id) =>
    setExpandList({
      ...expandList,
      [id]: !expandList[id],
    });

  return (
    <footer className="footer">
      <div className="boxes">
        <div className="box">
          <h2 className="box__header">
            <Link to="/">About Us</Link>
            <div className="expand" onClick={() => handleExpandList(1)}>
              {!expandList[1] ? <AiOutlinePlus /> : <AiOutlineMinus />}
            </div>
          </h2>
          <ul
            className={
              expandList[1] ? "box__list box__list--expand" : "box__list"
            }
          >
            <li className="list__item">
              <Link to="/">About Us</Link>{" "}
            </li>
            <li className="list__item">
              <Link to="/">Community</Link>{" "}
            </li>
            <li className="list__item">
              <Link to="/">Jobs</Link>
            </li>
            <li className="list__item">
              <Link to="/">Shipping</Link>
            </li>
            <li className="list__item">
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2 className="box__header">
            <Link to="/">Our Services</Link>
            <div className="expand" onClick={() => handleExpandList(2)}>
              {!expandList[2] ? <AiOutlinePlus /> : <AiOutlineMinus />}
            </div>
          </h2>
          <ul
            className={
              expandList[2] ? "box__list box__list--expand" : "box__list"
            }
          >
            <li className="list__item">
              <Link to="/">Free Shipping</Link>
            </li>
            <li className="list__item">
              <Link to="/">Free Returns</Link>
            </li>
            <li className="list__item">
              <Link to="/">Franchising</Link>
            </li>
            <li className="list__item">
              <Link to="/">Terms & Conditions</Link>
            </li>
            <li className="list__item">
              <Link to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2 className="box__header">
            <Link to="/">Information</Link>
            <div className="expand" onClick={() => handleExpandList(3)}>
              {!expandList[3] ? <AiOutlinePlus /> : <AiOutlineMinus />}
            </div>
          </h2>
          <ul
            className={
              expandList[3] ? "box__list box__list--expand" : "box__list"
            }
          >
            <li className="list__item">
              <Link to="/">Payment Methods</Link>
            </li>
            <li className="list__item">
              <Link to="/">Shipping Methods</Link>
            </li>
            <li className="list__item">
              <Link to="/">Returns</Link>
            </li>
            <li className="list__item">
              <Link to="/">Products Conformity</Link>
            </li>
            <li className="list__item">
              <Link to="/">Delivery</Link>
            </li>
          </ul>
        </div>
        <div className="box">
          <h2 className="box__header">Socials</h2>
          <div className="icons">
            <Link to="/">
              <div className="social__icon">
                <AiOutlineTwitter />
              </div>
            </Link>
            <Link to="/">
              <div className="social__icon">
                <FaFacebookF />
              </div>
            </Link>
            <Link to="/">
              <div className="social__icon">
                <FaInstagram />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer__rights">
        <span className="copyright">
          &copy; 2020 NikeFan - All Rights Reserved
        </span>
        <div className="terms">
          <span className="term">
            <Link to="/">Terms Of Sell</Link>
          </span>
          <span className="term">
            <Link to="/">Terms Of Use</Link>
          </span>
          <span className="term">
            <Link to="/">Privacy Policy </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

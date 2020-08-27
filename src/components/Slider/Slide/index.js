import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Slide = ({ title, subTitle, btnContent, image, isActive }) => {
  return (
    <div
      className={isActive ? "slide slide--active" : "slide"}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="slide__content">
        <div className="slide__title">
          <h2 className="">{title}</h2>
        </div>
        <div className="slide__subtitle">
          <h3 className="">{subTitle}</h3>
        </div>
        <div className="slide__button">
          <Link to="/catalog">{btnContent}</Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;

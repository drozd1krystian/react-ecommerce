import React from "react";
import "./style.scss";
import Slider from "../../components/Slider";
import Carousel from "../../components/Carousel";
import { Link } from "react-router-dom";

import { AiOutlineFieldTime } from "react-icons/ai";
import { FiPhoneCall, FiBox } from "react-icons/fi";
import { MdFiberNew } from "react-icons/md";
import list from "../../assets/nike20.json";

const cards = [
  {
    header: "Fast Delivery",
    icon: AiOutlineFieldTime,
    subHeader: "Lorem ipsum dolor sit.",
  },
  {
    header: "Support 24/7",
    icon: FiPhoneCall,
    subHeader: "Lorem ipsum dolor sit.",
  },
  {
    header: "Free Returns",
    icon: FiBox,
    subHeader: "Lorem ipsum dolor sit.",
  },
  {
    header: "Up to 60% Sales",
    icon: MdFiberNew,
    subHeader: "Lorem ipsum dolor sit.",
  },
];

const getData = (start, end) => {
  const data = [];
  for (let i = start; i < end; i++) {
    data.push(list[i]);
  }
  return data;
};

const bestSellers = getData(0, 7);
const trading = getData(7, 14);

const HomePage = (props) => {
  return (
    <div className="">
      <Slider />
      <div className="carousel__wrapper">
        <h2 className="home__header p1 mt1">Trading</h2>
        <p className="home__subheader text--center">Top view this week</p>
        <Carousel list={trading} />
      </div>

      <div className="banner">
        <h1 className="banner__header">New Summer Sale</h1>
        <h1 className="banner__header--big">60% Off</h1>
        <div className="banner__button">
          <Link to="/catalog">Shop Now</Link>
        </div>
      </div>

      <div className="carousel__wrapper">
        <h2 className="home__header p1 mt1">Best Sellers</h2>
        <p className="home__subheader text--center">Top sale this week</p>
        <Carousel list={bestSellers} />
      </div>

      <div className="cards__container">
        {cards.map((el, index) => (
          <div className="card__wrapper" key={index}>
            <div className="card">
              <div className="card__icon">{React.createElement(el.icon)}</div>
              <div className="card__desc">
                <p className="card__header">{el.header}</p>
                <p className="card__subheader">{el.subHeader}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

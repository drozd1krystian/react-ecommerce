import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

// Nike Air, Jordan, LeBron, Nike Flex, Nike Free

const Product = (props) => {
  return (
    <div className="wrapper">
      <Link to={{ pathname: `/product/${1}` }}>
        <div className="card">
          <div className="photo">
            <img
              src="https://adrenaline.pl/pol_pl_BUTY-MESKIE-LIFESTYLE-NIKE-AIR-MAX-270-BIALE-AH8050-100-37594_1.jpg"
              alt="product"
            />
          </div>
          <div className="product-name">
            <span> Nike Air Force 1 '07 Essential </span>
            <span className="text-sub"> 100$</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

import React from "react";
import "./style.scss";
import Products from "../Products/index";
import Filters from "../Filters/index";

const HomePage = (props) => {
  return (
    <div className="page">
      <Filters />
      <Products />
    </div>
  );
};

export default HomePage;

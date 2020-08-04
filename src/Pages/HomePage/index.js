import React from "react";
import "./style.scss";

import Products from "./Products/index";
import Filters from "./Filters/index";

const HomePage = (props) => {
  return (
    <div className="page">
      <div className="content">
        <Filters />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;

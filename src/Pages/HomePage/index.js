import React from "react";
import "./style.scss";

import Products from "./Products/index";
import Filters from "./Filters/index";
import { useState } from "react";
import { IoMdOptions } from "react-icons/io";
import Select from "../../components/Select";

const HomePage = (props) => {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = () => {
    const toggle = !showFilters;
    setShowFilters(toggle);
    if (window.innerWidth < 1024) {
      if (showFilters) document.body.style.position = "fixed";
      else document.body.style.position = "initial";
    }
  };

  return (
    <div className="page">
      <div className="options">
        <IoMdOptions onClick={toggleFilters} />
        <Select />
      </div>
      <div className="content">
        <Filters showFilters={showFilters} toggleFilters={toggleFilters} />
        <Products />
      </div>
    </div>
  );
};

export default HomePage;

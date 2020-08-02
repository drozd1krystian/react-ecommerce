import React from "react";
import "./style.scss";
import Product from "./Product/index";

const Porducts = (props) => {
  return (
    <div className="products-container">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};

export default Porducts;

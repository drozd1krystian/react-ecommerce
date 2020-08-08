import React from "react";
import "./style.scss";
import Product from "../../../components/Product/index";

//import { addProducts } from "../../../firebase/utils";
import pro from "../../../assets/nike20.json";

const Products = (props) => {
  return (
    <div className="products-container">
      {/* <div>
        <button onClick={() => addProducts(pro)}>Add</button>
      </div> */}
      {pro.map((el, index) => {
        return <Product key={index} product={el}></Product>;
      })}
    </div>
  );
};

export default Products;

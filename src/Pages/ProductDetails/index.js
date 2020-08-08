import React from "react";
import "./style.scss";

import { useParams } from "react-router-dom";

const ProductDetails = (props) => {
  let { productId } = useParams();

  return (
    <div>
      <h1>Product details {productId}</h1>
    </div>
  );
};

export default ProductDetails;

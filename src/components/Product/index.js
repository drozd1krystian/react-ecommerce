import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

// Nike Air, Jordan, LeBron, Nike Flex, Nike Free

const Product = (props) => {
  const { product } = props;
  return (
    <div className="wrapper">
      <Link to={{ pathname: `/product/${product.productId}` }}>
        <div className="card">
          <div className="photo">
            <img src={product.images[0]} alt="product" />
          </div>
          <div className="product-details">
            <span className="product-name"> {product.productName} </span>
            <span className="product-price"> {product.salePrice} $</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

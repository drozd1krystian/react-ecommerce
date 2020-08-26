import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Product = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <Link to={{ pathname: `/product/${product.productId}` }}>
        <div className="card__content">
          <div className="photo">
            <img src={product.images[0]} alt="product" className="photo__img" />
          </div>
          <div className="details">
            <span className="details__name">{product.productName}</span>
            <span className="details__price">{`${product.salePrice} $`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

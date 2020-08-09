import React from "react";
import "./style.scss";

import { useParams } from "react-router-dom";

import pro from "../../assets/nike20.json";

import Product from "../../components/Product/index";

const ProductDetails = (props) => {
  // let { productId } = useParams();

  let product = pro[0];

  const getFiveRandomProducts = () => {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(Math.floor(Math.random() * pro.length));
    }
    return arr.map((el) => pro[el]);
  };

  return (
    <div>
      <div className="content">
        <div className="images">
          {product.images.map((el, index) => (
            <div className="img" key={`img-${index}`}>
              <img src={el} alt={product.productName} />
            </div>
          ))}
        </div>
        <div className="product-description">
          <h2 className="py2">{product.productName}</h2>
          <span>{product.salePrice} $</span>
          <p className="py2">{product.description}</p>

          <p>Pick your size:</p>
          <div className="sizes mb2">
            {product.sizes.map((el, index) => (
              <div className="size" key={`radio-${index}`}>
                <input type="radio" value={el} name="size" id={`size-${el}`} />
                <label htmlFor={`size-${el}`}>
                  <span>EU {el}</span>
                </label>
              </div>
            ))}
          </div>
          <button className="btn-light">
            <span>Add to cart</span>
          </button>
        </div>
      </div>
      <h3 className="p1">Similiar products</h3>
      <div className="similiar-products">
        {getFiveRandomProducts().map((el, index) => {
          return <Product key={`similar-${index}`} product={el} />;
        })}
      </div>
    </div>
  );
};

export default ProductDetails;

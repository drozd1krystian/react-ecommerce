import React from "react";
import "./style.scss";

import { useParams } from "react-router-dom";

import pro from "../../assets/nike20.json";

const ProductDetails = (props) => {
  // let { productId } = useParams();

  let product = pro[0];

  return (
    <div className="content">
      <div className="images">
        {product.images.map((el) => (
          <div class="img">
            <img src={el} alt={product.productName} />
          </div>
        ))}
      </div>
      <div className="product-details">
        <h2 className="py2">{product.productName}</h2>
        <span>{product.salePrice} $</span>
        <p className="py2">{product.description}</p>

        <p>Pick your size:</p>
        <div className="sizes mb2">
          {product.sizes.map((el) => (
            <div className="size">
              <input type="radio" value={el} name="size" id={`size-${el}`} />
              <label for={`size-${el}`}>
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
  );
};

export default ProductDetails;

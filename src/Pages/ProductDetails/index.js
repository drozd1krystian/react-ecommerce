import React, { useRef, useState, useEffect } from "react";
import "./style.scss";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

import pro from "../../assets/nike20.json";

import { addProductToCart } from "../../redux/Cart/cart.actions";
import Product from "../../components/Product/index";
import Error from "../../components/Error/index";
import LoadingScreen from "../../components/LoadingScreen";

const mapState = ({ cart }) => ({
  loadingScreen: cart.loadingScreen,
});

const ProductDetails = (props) => {
  // let { productId } = useParams();

  const product = pro[0];
  const scroller = useRef(null);
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [errors, setErrors] = useState([]);
  const [similiarProducts, setSimiliarProducts] = useState([]);
  const [showLoadingScreen, setShowLoadingScreen] = useState(null);
  const { loadingScreen } = useSelector(mapState);

  const handleRadioInput = (e) => {
    const { value } = e.target;
    setSize(value);
  };

  const handleAddProduct = () => {
    if (!size) {
      setErrors(["Please pick your size!"]);
      return;
    }
    const { productId, productName, salePrice, brand, images } = product;
    dispatch(
      addProductToCart({
        productId,
        productName,
        salePrice,
        brand,
        images,
        amount: 1,
        size,
      })
    );
    setErrors([]);
  };

  useEffect(() => {
    getFiveRandomProducts();
  }, []);

  useEffect(() => {
    if (loadingScreen.isLoading) setShowLoadingScreen(true);
    return () => {
      setShowLoadingScreen(false);
    };
  }, [loadingScreen.isLoading, showLoadingScreen]);

  const getFiveRandomProducts = () => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(Math.floor(Math.random() * pro.length));
    }
    setSimiliarProducts(arr.map((el) => pro[el]));
  };

  const scrollRight = () => {
    scroller.current.scrollBy({
      left: Math.floor(scroller.current.offsetWidth * 23 * 0.01),
      behavior: "smooth",
    });
  };
  const scrollLeft = () => {
    scroller.current.scrollBy({
      left: -Math.floor(scroller.current.offsetWidth * 23 * 0.01),
      behavior: "smooth",
    });
  };

  return (
    <div>
      {showLoadingScreen && <LoadingScreen />}

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
          <Error errors={errors} />
          <div className="sizes mb2">
            {product.sizes.map((el, index) => (
              <div className="size" key={`radio-${index}`}>
                <input
                  type="radio"
                  value={el}
                  name="size"
                  id={`size-${el}`}
                  onClick={handleRadioInput}
                />
                <label htmlFor={`size-${el}`}>
                  <span>EU {el}</span>
                </label>
              </div>
            ))}
          </div>
          <button className="btn-light" onClick={handleAddProduct}>
            <span>Add to cart</span>
          </button>
        </div>
      </div>
      <h3 className="p1">Similiar products</h3>
      <div className="wrap">
        <div className="similiar-products" ref={scroller}>
          {similiarProducts.map((el, index) => {
            return <Product key={`similar-${index}`} product={el} />;
          })}
        </div>
        <div className="btn-left" onClick={scrollLeft}>
          <AiOutlineLeft />
        </div>
        <div className="btn-right" onClick={scrollRight}>
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

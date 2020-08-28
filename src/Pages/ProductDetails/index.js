import React, { useState, useEffect } from "react";
import "./style.scss";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/Cart/cart.actions";
import Error from "../../components/Error/index";
import LoadingScreen from "../../components/LoadingScreen";
import SizeRadioButton from "../../components/forms/SizeRadioButton";
import NotFoundTempalte from "../../Templates/NotFoundTemplate/index";
import Carousel from "../../components/Carousel";

const mapState = ({ products }) => ({
  products: products.products,
});

const ProductDetails = (props) => {
  const { productId } = useParams();
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [errors, setErrors] = useState([]);
  const [similiarProducts, setSimiliarProducts] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [product, setProduct] = useState({
    productId: null,
    productName: "",
    salePrice: null,
    brand: "",
    sizes: [],
    description: "",
    images: [],
  });

  useEffect(() => {
    const data = products.find((el) => el.productId === productId);
    if (data === undefined) setNotFound(true);
    else setProduct(data);
  }, [productId, products, notFound, setNotFound]);

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
    const getFiveRandomProducts = () => {
      let arr = [];
      if (products.length > 0) {
        for (let i = 0; i < 7; i++) {
          let value = Math.floor(Math.random() * products.length);
          if (!arr.includes(value)) arr.push(value);
          else i--;
        }
      }
      return arr;
    };

    let arr = getFiveRandomProducts();
    setSimiliarProducts(arr.map((el) => products[el]));
  }, [setSimiliarProducts, products]);

  return (
    <>
      <LoadingScreen />
      {notFound ? (
        <NotFoundTempalte type="Product" />
      ) : (
        <>
          <div className="content">
            <div className="images">
              {product.images.map((el, index) => (
                <div className="img" key={`img-${index}`}>
                  <img src={el} alt={product.productName} />
                </div>
              ))}
            </div>
            <div className="description">
              <h2 className="py2 field">{product.productName}</h2>
              <span className="field">{product.salePrice} $</span>
              <p className="py2 field">{product.description}</p>

              <p className="field">Pick your size:</p>
              <Error errors={errors} />
              <div className="description__sizes mb2">
                {product.sizes.map((el, index) => (
                  <SizeRadioButton
                    value={el}
                    id={`size-${el}`}
                    onClick={handleRadioInput}
                    key={`radio-${index}`}
                    label={el}
                  />
                ))}
              </div>
              <button
                className="btn btn--light btn--round btn--slide"
                onClick={handleAddProduct}
              >
                <span>Add to cart</span>
              </button>
            </div>
          </div>
          <Carousel header="Similiar Products" />
        </>
      )}
    </>
  );
};

export default ProductDetails;

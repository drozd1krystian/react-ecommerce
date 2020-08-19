import React from "react";
import "./style.scss";
import Product from "../../../components/Product/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductsStart } from "../../../redux/Products/products.actions";

// import { addProducts } from "../../../firebase/utils";

// import all from "../../../assets/nike_data.json";

const mapState = ({ products }) => ({
  products: products.products,
});

const Products = (props) => {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);
  return (
    <div className="products-container">
      {/* <div>
        <button onClick={() => addProducts(all)}>Add</button>
      </div> */}
      {products.map((el, index) => {
        return <Product key={index} product={el}></Product>;
      })}
    </div>
  );
};

export default Products;

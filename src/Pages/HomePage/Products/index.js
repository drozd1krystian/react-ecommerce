import React from "react";
import "./style.scss";
import Product from "../../../components/Product/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductsStart } from "../../../redux/Products/products.actions";
import Button from "../../../components/forms/Button";

// import { addProducts } from "../../../firebase/utils";

// import all from "../../../assets/nike_data.json";

const mapState = ({ products }) => ({
  products: products.products,
  pagination: products.pagination,
});

const Products = (props) => {
  const { products, pagination } = useSelector(mapState);
  const dispatch = useDispatch();
  const { start, limit } = pagination;

  const loadMoreProducts = () => {
    dispatch(fetchProductsStart({ start, limit }));
  };

  useEffect(() => {
    if (products.length === 0)
      dispatch(fetchProductsStart({ start: 0, limit: 20 }));
  }, [dispatch, products]);

  return (
    <div className="products-container">
      {/* <div>
        <button onClick={() => addProducts(all)}>Add</button>
      </div> */}
      {products.map((el, index) => {
        return <Product key={index} product={el}></Product>;
      })}
      <Button onClick={loadMoreProducts}>Load More</Button>
    </div>
  );
};

export default Products;

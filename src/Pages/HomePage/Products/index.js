import React from "react";
import "./style.scss";
import Product from "../../../components/Product/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchProductsStart,
  changeFilterType,
} from "../../../redux/Products/products.actions";
import Button from "../../../components/forms/Button";
import { scrollTop } from "../../../helpers/scrollTop";

// import { addProducts } from "../../../firebase/utils";

// import all from "../../../assets/nike_data.json";

const mapState = ({ products }) => ({
  products: products.products,
  filters: products.filters,
  sort: products.sort,
});

const Products = (props) => {
  const { products, filters, sort } = useSelector(mapState);
  const dispatch = useDispatch();
  const loadMoreProducts = () => {
    dispatch(changeFilterType("load"));
    dispatch(fetchProductsStart({ filters, sort }));
    scrollTop();
  };

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsStart({ filters, sort }));
    }
  }, [dispatch, filters, sort, products.length]);

  return (
    <div className="products">
      {/* <div>
        <button onClick={() => addProducts(all)}>Add</button>
      </div> */}
      {products.map((el, index) => {
        return <Product key={index} product={el}></Product>;
      })}
      <Button
        onClick={loadMoreProducts}
        disabled={products.length < filters.limit}
      >
        Load More
      </Button>
    </div>
  );
};

export default Products;

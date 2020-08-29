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
import { useState } from "react";
import SkeletonCard from "../../../components/Skeletons/SkeletonCard";
import { FaRegSadTear } from "react-icons/fa";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapState = ({ products }) => ({
  products: products.products,
  loading: products.loading,
  filters: products.filters,
  sort: products.sort,
});

const Products = (props) => {
  const { products, filters, sort, loading } = useSelector(mapState);
  const [cards, setCards] = useState([]);

  const dispatch = useDispatch();
  const loadMoreProducts = () => {
    dispatch(changeFilterType("load"));
    dispatch(fetchProductsStart({ filters, sort }));
    scrollTop();
  };

  useEffect(() => {
    if (loading && products.length === 0)
      dispatch(fetchProductsStart({ filters, sort }));

    const generateSlides = () => {
      return loading
        ? Array(products.length || 10)
            .fill()
            .map((_, id) => (
              <CSSTransition key={id} timeout={500} classNames="item">
                <SkeletonCard key={id} />
              </CSSTransition>
            ))
        : products.map((el, index) => (
            <CSSTransition key={index} timeout={500} classNames="item">
              <Product key={index} product={el} />
            </CSSTransition>
          ));
    };
    const data = generateSlides();
    setCards(data);
  }, [dispatch, filters, sort, products, loading]);

  return (
    <div className="products">
      <TransitionGroup className="pro" component={null}>
        {cards}
      </TransitionGroup>

      {cards.length === 0 && (
        <div className="height--full products--empty">
          <h2 className=" p1 text--center">No products fullfill criteria</h2>
          <p className="icon--big text--center ">
            <FaRegSadTear />
          </p>
        </div>
      )}
      <Button
        onClick={loadMoreProducts}
        disabled={cards.length < filters.limit}
      >
        Load More
      </Button>
    </div>
  );
};

export default Products;

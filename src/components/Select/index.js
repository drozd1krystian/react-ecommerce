import React from "react";
import "./style.scss";
import Select from "react-select";
import { sortProducts } from "../../redux/Products/products.actions";
import { scrollTop } from "../../helpers/scrollTop";
import { useDispatch } from "react-redux";
import productsTypes from "../../redux/Products/products.types";

const options = [
  { value: "desc", label: "Price: from highest", field: "salePrice" },
  { value: "asc", label: "Price: from lowest", field: "salePrice" },
];

const MySelect = (props) => {
  const dispatch = useDispatch();
  const sort = (option) => {
    const { value, field } = option;
    dispatch(sortProducts({ direction: value, field }));
    dispatch({ type: productsTypes.LOADING, payload: true });
    setTimeout(() => {
      dispatch({ type: productsTypes.LOADING, payload: false });
    }, 1000);
    scrollTop();
  };

  return <Select options={options} className="select" onChange={sort} />;
};

export default MySelect;

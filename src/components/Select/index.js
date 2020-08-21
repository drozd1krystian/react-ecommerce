import React from "react";
import "./style.scss";
import Select from "react-select";
import { sortProducts } from "../../redux/Products/products.actions";
import { useDispatch } from "react-redux";

const options = [
  { value: "desc", label: "Price: from highest" },
  { value: "asc", label: "Price: from lowest" },
];

const MySelect = (props) => {
  const dispatch = useDispatch();
  const sort = (option) => {
    dispatch(sortProducts(option.value));
  };

  return <Select options={options} className="select" onChange={sort} />;
};

export default MySelect;

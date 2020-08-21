import React from "react";
import "./style.scss";

import CheckBox from "../../../components/forms/CheckBox";
import { useDispatch, useSelector } from "react-redux";

import {
  addFilter,
  fetchProductsStart,
  changeFilterType,
  clearFilters,
  removeFilter,
} from "../../../redux/Products/products.actions";
import Button from "../../../components/forms/Button";

const mapState = ({ products }) => ({
  filters: products.filters,
});

const Filters = (props) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(mapState);
  const sizesValues = [39, 40, 41, 42, 43, 44, 45, 46];
  const brandsValues = [
    "Nike",
    "Nike Air",
    "Jordan",
    "Nike Free",
    "Nike Air Force",
    "Nike SB",
    "Nike Flex",
    "LeBron",
  ];

  const handleFilterCheck = (e) => {
    const { value, name } = e.target;
    if (filters[name].includes(parseInt(value) || value)) {
      dispatch(removeFilter({ type: name, value: parseInt(value) || value }));
      return;
    }
    dispatch(addFilter({ type: name, value: parseInt(value) || value }));
  };

  const fetchProducts = () => {
    dispatch(changeFilterType("filter"));
    dispatch(fetchProductsStart(filters));
  };

  const mapSizes = () => {
    return sizesValues.map((el, index) => (
      <CheckBox
        label={el}
        key={`size-${index}`}
        value={el}
        name="sizes"
        onChange={handleFilterCheck}
        checked={filters.sizes.includes(parseInt(el))}
      />
    ));
  };

  const mapBrands = () => {
    return brandsValues.map((el, index) => (
      <CheckBox
        label={el}
        key={`brand-${index}`}
        value={el}
        name="brands"
        onChange={handleFilterCheck}
        checked={filters.brands.includes(el)}
      />
    ));
  };

  return (
    <div className="filters column">
      <h3 className="">Pick Size</h3>
      <div className="list sizes">{mapSizes()}</div>

      <h3 className="">Pick Brand</h3>
      <div className="list ">{mapBrands()}</div>

      <Button onClick={fetchProducts}>Filter</Button>
      <Button onClick={() => dispatch(clearFilters())}>Clear</Button>
    </div>
  );
};

export default Filters;

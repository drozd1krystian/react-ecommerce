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
  resetStarter,
} from "../../../redux/Products/products.actions";
import Button from "../../../components/forms/Button";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

const mapState = ({ products }) => ({
  filters: products.filters,
  sort: products.sort,
});

const sizesValues = [39, 40, 41, 42, 43, 44, 45, 46];
const brandsValues = [
  "Nike",
  "Nike Air",
  "Jordan",
  "Nike Free",
  "Nike SB",
  "Nike Flex",
  "LeBron",
];

const Filters = (props) => {
  const dispatch = useDispatch();
  const { filters, sort } = useSelector(mapState);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const { showFilters, toggleFilters } = props;

  const handleFilterCheck = (e) => {
    const { value, name } = e.target;
    setFiltersChanged(true);
    if (filters[name].includes(parseInt(value) || value)) {
      dispatch(removeFilter({ type: name, value: parseInt(value) || value }));
      return;
    }
    dispatch(addFilter({ type: name, value: parseInt(value) || value }));
  };

  const fetchProducts = () => {
    if (filtersChanged) {
      dispatch(changeFilterType("filter"));
      dispatch(resetStarter());
      dispatch(fetchProductsStart({ filters, sort }));
      if (window.innerWidth < 1024) {
        toggleFilters();
      }
    }
    setFiltersChanged(false);
  };

  const clearSelectedFilters = () => {
    dispatch(clearFilters());
    setFiltersChanged(true);
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
    <div className={showFilters ? "show-filters filters" : "filters"}>
      <span className="filters__close" onClick={toggleFilters}>
        <GrClose />
      </span>
      <h3 className="field">Size</h3>
      <div className="filters__list sizes">{mapSizes()}</div>

      <h3 className="field">Brand</h3>
      <div className="filters__list">{mapBrands()}</div>
      <div className="btn__wrapper">
        <Button onClick={fetchProducts}>Filter</Button>
        <Button onClick={clearSelectedFilters}>Clear</Button>
      </div>
    </div>
  );
};

export default Filters;

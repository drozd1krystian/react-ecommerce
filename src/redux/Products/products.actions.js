import productsTypes from "./products.types";

export const fetchProductsStart = (filters) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const addFilter = (filter) => ({
  type: productsTypes.ADD_FILTER,
  payload: filter,
});

export const changeFilterType = (category) => ({
  type: productsTypes.CHANGE_FILTER_TYPE,
  payload: category,
});

export const clearFilters = () => ({
  type: productsTypes.CLEAR_FILTERS,
});

export const removeFilter = (filter) => ({
  type: productsTypes.REMOVE_FILTER,
  payload: filter,
});

export const resetStarter = () => ({
  type: productsTypes.RESET_STARTER,
});

export const sortProducts = (category) => ({
  type: productsTypes.SORT,
  payload: category,
});

import productsTypes from "./products.types";

export const fetchProductsStart = (pagination) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: pagination,
});

export const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

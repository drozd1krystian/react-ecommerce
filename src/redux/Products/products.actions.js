import productsTypes from "./products.types";

export const fetchProductsStart = () => ({
  type: productsTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: productsTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

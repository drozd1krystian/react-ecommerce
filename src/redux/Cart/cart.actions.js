import cartTypes from "./cart.types";

export const addProductToCart = (product) => ({
  type: cartTypes.ADD_PRODUCT,
  payload: product,
});

export const removeProductFromCart = (productId) => ({
  type: cartTypes.REMOVE_PRODUCT,
  payload: productId,
});

export const inscreaseAmount = (productId) => ({
  type: cartTypes.INCREASE_AMOUNT,
  payload: productId,
});

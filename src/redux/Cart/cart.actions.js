import cartTypes from "./cart.types";

export const addProductToCart = (product) => (dispatch) => {
  dispatch({ type: cartTypes.ADD_PRODUCT, payload: product });
  dispatch({
    type: cartTypes.SHOW_CART,
    payload: 2000,
  });
  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_CART, payload: 0 });
  }, 2000);
};

export const removeProductFromCart = (productId) => ({
  type: cartTypes.REMOVE_PRODUCT,
  payload: productId,
});

export const inscreaseAmount = (productId) => ({
  type: cartTypes.INCREASE_AMOUNT,
  payload: productId,
});

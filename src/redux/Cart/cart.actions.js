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

export const removeProduct = (index) => ({
  type: cartTypes.REMOVE_PRODUCT,
  payload: index,
});

export const inscreaseAmount = (index) => ({
  type: cartTypes.INCREASE_AMOUNT,
  payload: index,
});

export const decreaseAmount = (index) => ({
  type: cartTypes.DECREASE_AMOUNT,
  payload: index,
});

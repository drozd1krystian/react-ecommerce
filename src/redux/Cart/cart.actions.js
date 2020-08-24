import cartTypes from "./cart.types";

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const addProductToCart = (product) => (dispatch) => {
  dispatch({ type: cartTypes.SHOW_LOADING, payload: 1000 });
  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_LOADING, payload: 0 });
  }, 1000);

  setTimeout(() => {
    dispatch({ type: cartTypes.ADD_PRODUCT, payload: product });
  }, 1000);

  setTimeout(() => {
    dispatch({ type: cartTypes.SHOW_CART, payload: 1000 });
    scrollTop();
  }, 1000);

  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_CART, payload: 0 });
  }, 3000);
};

export const removeProduct = (index) => (dispatch) => {
  dispatch({ type: cartTypes.SHOW_LOADING, payload: 1000 });
  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_LOADING, payload: 0 });
  }, 1001);
  setTimeout(() => {
    dispatch({
      type: cartTypes.REMOVE_PRODUCT,
      payload: index,
    });
  }, 1000);
};

export const inscreaseAmount = (index) => (dispatch) => {
  dispatch({ type: cartTypes.SHOW_LOADING, payload: 1000 });
  setTimeout(() => {
    dispatch({
      type: cartTypes.INCREASE_AMOUNT,
      payload: index,
    });
  }, 1000);

  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_LOADING, payload: 0 });
  }, 1000);
};

export const decreaseAmount = (index) => (dispatch) => {
  dispatch({ type: cartTypes.SHOW_LOADING, payload: 1000 });
  setTimeout(() => {
    dispatch({
      type: cartTypes.DECREASE_AMOUNT,
      payload: index,
    });
  }, 1000);
  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_LOADING, payload: 0 });
  }, 1000);
};

export const checkOut = (order) => (dispatch) => {
  dispatch({ type: cartTypes.SHOW_LOADING, payload: 1000 });
  setTimeout(() => {
    dispatch({ type: cartTypes.HIDE_LOADING, payload: 0 });
  }, 1001);

  setTimeout(() => {
    dispatch({
      type: cartTypes.CHECK_OUT,
      payload: order,
    });
    scrollTop();
  }, 1000);
};

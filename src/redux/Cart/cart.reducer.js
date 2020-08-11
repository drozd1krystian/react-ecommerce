import cartTypes from "./cart.types";

const INITIAL_STATE = {
  cart: [],
  count: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT:
      const newState = { ...state };
      const productExist = newState.cart.findIndex(
        (el) => el.productId === action.payload.productId
      );

      if (productExist !== -1) newState.cart[productExist].amount++;
      else newState.cart = [...newState.cart, action.payload];

      return {
        ...newState,
        count: state.count + 1,
      };
    case cartTypes.INCREASE_AMOUNT:
      return {
        ...state,
        cart: state.cart.map((el) => {
          if (el.productId === action.payload) return el.amount++;
          return el;
        }),
        count: newState.count++,
      };
    default:
      return state;
  }
};

export default cartReducer;

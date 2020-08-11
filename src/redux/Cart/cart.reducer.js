import cartTypes from "./cart.types";

const INITIAL_STATE = {
  cart: [],
  loading: {
    isLoading: false,
    duration: 0,
  },
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT: {
      const newState = { ...state };
      const { productId, size } = action.payload;
      const productExist = newState.cart.findIndex(
        (el) => el.productId === productId && el.size === size
      );

      if (productExist !== -1) newState.cart[productExist].amount++;
      else newState.cart = [...newState.cart, action.payload];

      return {
        ...newState,
      };
    }

    case cartTypes.INCREASE_AMOUNT: {
      const { productId, size } = action.payload;
      return {
        ...state,
        cart: state.cart.map((el) => {
          return el.productId === productId && el.size === size
            ? el.amount++
            : el;
        }),
      };
    }
    case cartTypes.SHOW_CART: {
      return {
        ...state,
        loading: {
          ...state.loading,
          isLoading: true,
          duration: action.payload,
        },
      };
    }
    case cartTypes.HIDE_CART: {
      return {
        ...state,
        loading: {
          ...state.loading,
          isLoading: false,
          duration: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export default cartReducer;

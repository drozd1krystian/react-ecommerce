import cartTypes from "./cart.types";

const INITIAL_STATE = {
  cart: [],
  loading: {
    isLoading: false,
    duration: 0,
  },
  loadingScreen: {
    isLoading: false,
    duratio: 0,
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
      return {
        ...state,
        cart: state.cart.map((el, index) =>
          index === action.payload ? { ...el, amount: el.amount + 1 } : el
        ),
      };
    }

    case cartTypes.DECREASE_AMOUNT: {
      return {
        ...state,
        cart: state.cart.map((el, index) =>
          index === action.payload ? { ...el, amount: el.amount - 1 } : el
        ),
      };
    }

    case cartTypes.REMOVE_PRODUCT: {
      return {
        ...state,
        cart: state.cart.filter((el, index) => index !== action.payload),
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

    case cartTypes.SHOW_LOADING: {
      return {
        ...state,
        loadingScreen: {
          isLoading: true,
          duration: action.payload,
        },
      };
    }

    case cartTypes.HIDE_LOADING: {
      return {
        ...state,
        loadingScreen: {
          isLoading: false,
          duration: action.payload,
        },
      };
    }

    case cartTypes.CHECK_OUT: {
      return {
        ...INITIAL_STATE,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;

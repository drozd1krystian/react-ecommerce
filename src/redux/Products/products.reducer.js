import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...action.payload],
      };
    case productsTypes.GET_PRODUCT:
      return {
        ...state,
        currentProduct: state.products.find(
          (el) => el.productId === action.payload
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default productsReducer;

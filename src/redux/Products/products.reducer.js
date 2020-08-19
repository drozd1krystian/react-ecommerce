import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  pagination: {
    start: 0,
    limit: 20,
  },
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: [...state.products, ...action.payload.products],
        pagination: {
          ...state.pagination,
          start: action.payload.last,
        },
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

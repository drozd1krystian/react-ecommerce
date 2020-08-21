import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  filters: {
    start: 0,
    limit: 20,
    sizes: [],
    brands: [],
    type: "load",
  },
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products:
          state.filters.type === "load"
            ? [...state.products, ...action.payload.products]
            : [...action.payload.products],
        filters: {
          ...state.filters,
          start: action.payload.last || 0,
        },
      };
    case productsTypes.ADD_FILTER: {
      const { type, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [type]: [...state.filters[type], value],
        },
      };
    }

    case productsTypes.REMOVE_FILTER: {
      const { type, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [type]: state.filters[type].filter((el) => el !== value),
        },
      };
    }

    case productsTypes.CHANGE_FILTER_TYPE: {
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.payload,
        },
      };
    }

    case productsTypes.RESET_STARTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          start: 0,
        },
      };
    }

    case productsTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...INITIAL_STATE.filters,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export default productsReducer;

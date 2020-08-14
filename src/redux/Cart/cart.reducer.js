import cartTypes from "./cart.types";

const INITIAL_STATE = {
  cart: [
    {
      url:
        "https://www.nike.com/in/t/air-force-1-07-essential-shoe-BHN3Db/CJ1646-600",
      productName: "Nike Air Force 1 '07 Essential",
      productId: "CJ1646-600",
      salePrice: 74.95,
      brand: "Nike Air Force",
      sizes: [39, 40, 45, 46, 42],
      description:
        "Let your shoe game shimmer in the Nike Air Force 1 '07 Essential. It takes the classic AF-1 design to the next level with its premium leather upper and iridescent Swoosh.",
      images: [
        "https://static.nike.com/a/images/t_PDP_1728_v1/20488f52-3686-476c-b4b8-0ca430c34a05/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/e9fe72b4-a153-4019-8ea6-9f31230b247c/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/490add03-5c99-403d-b456-48036981ac92/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/d4e9d5d6-3c97-4e58-bed6-1a2780519612/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/8222053d-ec2a-4ba9-a8bb-7fe7e2108dad/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/55111c5b-d5ea-4919-8d16-4af85bcdf0ae/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/ccf5f7e1-4a4c-460d-a8c4-a93f99050c50/air-force-1-07-essential-shoe-BHN3Db.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/7f0d8790-7309-4d95-96f1-280b2c3e5cf3/air-force-1-07-essential-shoe-BHN3Db.jpg",
      ],
      amount: 2,
    },
    {
      url: "https://www.nike.com/in/t/air-force-1-07-shoe-jKJ8T4/CT4328-101",
      productName: "Nike Air Force 1 '07",
      productId: "CT4328-101",
      salePrice: 74.95,
      brand: "Nike Air Force",
      sizes: [39, 42, 43],
      description:
        "The legend lives on in the Nike Air Force 1 '07, a modern take on the iconic AF1 that blends classic style with fresh colours and details.",
      images: [
        "https://static.nike.com/a/images/t_PDP_1728_v1/67e9c661-4cbb-4ff3-963f-49c0a219ba22/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/b1ed2d84-1daa-40d8-99b5-b9e49bcaa847/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/de328105-55fd-4929-8ce7-84b757e16208/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/2d09a770-c245-4944-94fe-b814dde3c8f3/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/fc94524c-f482-4a36-bdf3-85cf1e169448/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/83b32091-6641-4589-8fbf-351db9eb874f/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/88d05d8d-d703-4dbf-ace5-29561dfc322a/air-force-1-07-shoe-jKJ8T4.jpg",
        "https://static.nike.com/a/images/t_PDP_1728_v1/cb003eed-963e-4f1b-87c5-a437ef47c6ff/air-force-1-07-shoe-jKJ8T4.jpg",
      ],
      amount: 1,
    },
  ],
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
          index === action.payload && el.amount > 1
            ? { ...el, amount: el.amount - 1 }
            : el
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

    default:
      return state;
  }
};

export default cartReducer;

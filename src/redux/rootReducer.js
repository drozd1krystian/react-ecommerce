import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/products.reducer";

export default combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productsReducer,
});

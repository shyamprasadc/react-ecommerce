import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
});
export default reducers;

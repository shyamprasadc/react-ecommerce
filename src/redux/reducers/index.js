import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";
import { userReducer } from "./userReducer";
import { ordersReducer } from "./ordersReducer";

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  orders: ordersReducer,
});
export default reducers;

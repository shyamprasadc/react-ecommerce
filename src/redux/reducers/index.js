import { combineReducers } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
export default reducers;

import { combineReducers } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductReducer,
  allCart: cartReducer,
  allWishlist: wishlistReducer,
});
export default reducers;

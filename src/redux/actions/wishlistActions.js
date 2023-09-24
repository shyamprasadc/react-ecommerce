import { ActionTypes } from "../constants/actionTypes";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/wishlist";
import { message } from "antd";

export const fetchWishlist = (history) => {
  return async (dispatch) => {
    const response = await getWishlist();
    if (response.isOk) {
      dispatch({
        type: ActionTypes.SET_WISHLIST,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.UPDATE_WISHLIST_COUNT,
        payload: response.data.length,
      });
      return;
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const addProductToWishlist = (productId, history) => {
  message.loading("Adding product to wishlist...", 0.5);
  return async (dispatch) => {
    const response = await addToWishlist(productId);
    if (response.isOk) {
      message.success("Product added to wishlist", 1);
      return dispatch(fetchWishlist());
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const removeProductFromWishlist = (wishlistId, history) => {
  message.loading("Removing product from wishlist...", 0.5);
  return async (dispatch) => {
    const response = await removeFromWishlist(wishlistId);
    if (response.isOk) {
      message.success("Product removed from wishlist", 1);
      return dispatch(fetchWishlist());
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const setWishlist = (wishlist) => {
  return {
    type: ActionTypes.SET_WISHLIST,
    payload: wishlist,
  };
};

export const removeWishlist = () => {
  return { type: ActionTypes.REMOVE_WISHLIST };
};

export const updateWishlistCount = (count) => {
  return {
    type: ActionTypes.UPDATE_WISHLIST_COUNT,
    payload: count,
  };
};

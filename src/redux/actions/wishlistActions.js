import { ActionTypes } from "../constants/actionTypes";

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

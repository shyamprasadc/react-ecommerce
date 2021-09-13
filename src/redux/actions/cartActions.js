import { ActionTypes } from "../constants/actionTypes";

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};

export const updateCartCount = (count) => {
  return {
    type: ActionTypes.UPDATE_CART_COUNT,
    payload: count,
  };
};

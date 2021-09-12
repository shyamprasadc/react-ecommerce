import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  wishlist: [],
};

export const wishlistReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_WISHLIST:
      return { ...state, wishlist: payload };
    default:
      return state;
  }
};

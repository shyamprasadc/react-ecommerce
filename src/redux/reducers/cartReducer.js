import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  cart: [],
};

export const cartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return { ...state, cart: payload };
    default:
      return state;
  }
};

import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
  count: 0,
};

export const cartReducer = (state = intialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SET_CART:
      return { ...state, all: payload };
    case ActionTypes.UPDATE_CART_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
};

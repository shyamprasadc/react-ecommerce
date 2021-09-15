import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
  count: 0,
};

export const cartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return { ...state, all: payload };
    case ActionTypes.REMOVE_CART:
      return { ...state, all: [], count: 0 };
    case ActionTypes.UPDATE_CART_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
};

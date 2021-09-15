import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
  count: 0,
};

export const wishlistReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_WISHLIST:
      return { ...state, all: payload };
    case ActionTypes.UPDATE_WISHLIST_COUNT:
      return { ...state, count: payload };
    default:
      return state;
  }
};

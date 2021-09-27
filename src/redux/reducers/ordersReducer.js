import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
};

export const ordersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ORDERS:
      return { ...state, all: payload };
    case ActionTypes.REMOVE_ORDERS:
      return { ...state, all: [] };
    default:
      return state;
  }
};

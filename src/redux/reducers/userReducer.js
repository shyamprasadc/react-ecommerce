import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  userDetails: {},
  userAddress: [],
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case ActionTypes.REMOVE_USER_DETAILS:
      return { ...state, userDetails: {} };
    case ActionTypes.SET_USER_ADDRESS:
      return { ...state, userAddress: payload };
    case ActionTypes.REMOVE_USER_ADDRESS:
      return { ...state, userAddress: [] };
    default:
      return state;
  }
};

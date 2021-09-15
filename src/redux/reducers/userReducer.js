import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  userDetails: {},
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    case ActionTypes.REMOVE_USER_DETAILS:
      return { ...state, userDetails: {} };
    default:
      return state;
  }
};

import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  userDetails: {},
};

export const userReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER_DETAILS:
      return { ...state, userDetails: payload };
    default:
      return state;
  }
};

import { ActionTypes } from "../constants/actionTypes";

export const setUserDetails = (user) => {
  return {
    type: ActionTypes.SET_USER_DETAILS,
    payload: user,
  };
};

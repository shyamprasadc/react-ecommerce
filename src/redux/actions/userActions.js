import { ActionTypes } from "../constants/actionTypes";

export const setUserDetails = (user) => {
  return {
    type: ActionTypes.SET_USER_DETAILS,
    payload: user,
  };
};

export const removeUserDetails = () => {
  return { type: ActionTypes.REMOVE_USER_DETAILS };
};

export const setUserAddress = (address) => {
  return {
    type: ActionTypes.SET_USER_ADDRESS,
    payload: address,
  };
};

export const removeUserAddress = (address) => {
  return { type: ActionTypes.REMOVE_USER_ADDRESS };
};

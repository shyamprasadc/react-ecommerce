import { ActionTypes } from "../constants/actionTypes";

export const setOrders = (orders) => {
  return {
    type: ActionTypes.SET_ORDERS,
    payload: orders,
  };
};

export const removeOrders = () => {
  return { type: ActionTypes.REMOVE_ORDERS };
};

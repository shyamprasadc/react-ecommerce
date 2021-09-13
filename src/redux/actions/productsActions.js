import { ActionTypes } from "../constants/actionTypes";

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const setProductDetails = (product) => {
  return {
    type: ActionTypes.SET_PRODUCT_DETAILS,
    payload: product,
  };
};

export const removeProductDetails = () => {
  return {
    type: ActionTypes.REMOVE_PRODUCT_DETAILS,
  };
};

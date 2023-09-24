import { ActionTypes } from "../constants/actionTypes";
import { getProducts } from "../../services/product";
import { message } from "antd";

export const fetchProducts = (history) => {
  return async (dispatch) => {
    const response = await getProducts();
    if (response.isOk) {
      return dispatch({
        type: ActionTypes.SET_PRODUCTS,
        payload: response.data,
      });
    }
    return message.error(response.data);
  };
};

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

export const setProductGroup = (product) => {
  return {
    type: ActionTypes.SET_PRODUCT_GROUP,
    payload: product,
  };
};

export const removeProductGroup = () => {
  return {
    type: ActionTypes.REMOVE_PRODUCT_GROUP,
  };
};

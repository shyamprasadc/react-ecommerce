import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
  productDetails: {},
};

export const productsReducer = (state = intialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, all: payload };
    case ActionTypes.SET_PRODUCT_DETAILS:
      return { ...state, productDetails: payload };
    case ActionTypes.REMOVE_PRODUCT_DETAILS:
      return { ...state, productDetails: {} };
    default:
      return state;
  }
};

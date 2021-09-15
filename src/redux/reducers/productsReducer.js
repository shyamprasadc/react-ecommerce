import { ActionTypes } from "../constants/actionTypes";
const intialState = {
  all: [],
  productDetails: {},
  productGroup: [],
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
    case ActionTypes.SET_PRODUCT_GROUP:
      return { ...state, productGroup: payload };
    case ActionTypes.REMOVE_PRODUCT_GROUP:
      return { ...state, productGroup: [] };
    default:
      return state;
  }
};

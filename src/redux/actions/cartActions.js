import { ActionTypes } from "../constants/actionTypes";
import { getCart, addToCart, removeFromCart } from "../../services/cart";
import { message } from "antd";

export const fetchCart = (history) => {
  return async (dispatch) => {
    const response = await getCart();
    if (response.isOk) {
      dispatch({
        type: ActionTypes.SET_CART,
        payload: response.data,
      });
      dispatch({
        type: ActionTypes.UPDATE_CART_COUNT,
        payload: response.data.length,
      });
      return;
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const addProductToCart = (productId, quantity, history) => {
  message.loading("Adding product to cart...", 0.5);
  return async (dispatch) => {
    const response = await addToCart(productId, quantity);
    if (response.isOk) {
      message.success("Product added to cart", 1);
      return dispatch(fetchCart(history));
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const removeProductFromCart = (cartId, history) => {
  message.loading("Removing product from cart...", 0.5);
  return async (dispatch) => {
    const response = await removeFromCart(cartId);
    if (response.isOk) {
      message.success("Product removed from cart", 1);
      return dispatch(fetchCart(history));
    }
    message.info("Please login to continue", 1);
    return history.push("/login");
  };
};

export const setCart = (cart) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};

export const removeCart = () => {
  return { type: ActionTypes.REMOVE_CART };
};

export const updateCartCount = (count) => {
  return {
    type: ActionTypes.UPDATE_CART_COUNT,
    payload: count,
  };
};

import { CONFIG } from "../config";
import { ActionTypes } from "../redux/constants/actionTypes";
import request from "../helpers/axios";
import store from "../redux/store";
import axios from "axios";

const initAction = (type, payload) => {
  return { type, payload };
};

export const getCart = () => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "GET",
    url: `${CONFIG.API.BASE_URL}/cart`,
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return request(options);
};

export const addToCart = (productId, quantity) => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "POST",
    url: `${CONFIG.API.BASE_URL}/cart`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      productId,
      quantity,
    },
  };

  return request(options);
};

export const removeFromCart = (cartId) => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "DELETE",
    url: `${CONFIG.API.BASE_URL}/cart`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      cartId,
    },
  };

  return request(options);
};

export const updateCart = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    method: "GET",
    url: "http://localhost:8080/api/cart",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios(config).catch((err) => {});
  if (response) {
    store.dispatch(initAction(ActionTypes.SET_CART, response.data));
    store.dispatch(
      initAction(ActionTypes.UPDATE_CART_COUNT, response.data.length)
    );
  }
};

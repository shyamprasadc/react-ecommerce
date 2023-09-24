import { CONFIG } from "../config";
import { ActionTypes } from "../redux/constants/actionTypes";
import request from "../helpers/axios";
import store from "../redux/store";
import axios from "axios";

const initAction = (type, payload) => {
  return { type, payload };
};

export const getWishlist = () => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "GET",
    url: `${CONFIG.API.BASE_URL}/wishlist`,
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return request(options);
};

export const addToWishlist = (productId) => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "POST",
    url: `${CONFIG.API.BASE_URL}/wishlist`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      productId,
    },
  };

  return request(options);
};

export const removeFromWishlist = (wishlistId) => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "DELETE",
    url: `${CONFIG.API.BASE_URL}/wishlist`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      wishlistId,
    },
  };

  return request(options);
};

export const updateWishlist = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    method: "GET",
    url: "http://localhost:8080/api/wishlist",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios(config).catch((err) => {});
  if (response) {
    store.dispatch(initAction(ActionTypes.SET_WISHLIST, response.data));
    store.dispatch(
      initAction(ActionTypes.UPDATE_WISHLIST_COUNT, response.data.length)
    );
  }
};

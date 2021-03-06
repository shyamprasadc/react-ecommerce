import axios from "axios";
import { store } from "../redux/store";
import { ActionTypes } from "../redux/constants/actionTypes";

const initAction = (type, payload) => {
  return { type, payload };
};

export const updateCart = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    method: "GET",
    url: "https://ecommerce-app-locus-backend.herokuapp.com/api/cart",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios(config).catch((err) => {
    console.log("Err: ", err);
  });
  if (response) {
    store.dispatch(initAction(ActionTypes.SET_CART, response.data));
    store.dispatch(
      initAction(ActionTypes.UPDATE_CART_COUNT, response.data.length)
    );
  }
};

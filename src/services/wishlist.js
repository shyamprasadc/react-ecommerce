import axios from "axios";
import { store } from "../redux/store";
import { ActionTypes } from "../redux/constants/actionTypes";

function initAction(type, payload) {
  return { type, payload };
}

export const updateWishlist = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    method: "GET",
    url: "https://ecommerce-app-locus.herokuapp.com/api/wishlist",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await axios(config).catch((err) => {
    console.log("Err: ", err);
  });
  if (response) {
    store.dispatch(initAction(ActionTypes.SET_WISHLIST, response.data));
    store.dispatch(
      initAction(ActionTypes.UPDATE_WISHLIST_COUNT, response.data.length)
    );
  }
};

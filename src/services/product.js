import { CONFIG } from "../config";
import request from "../helpers/axios";

export const getProducts = () => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    method: "GET",
    url: `${CONFIG.API.BASE_URL}/products`,
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  return request(options);
};

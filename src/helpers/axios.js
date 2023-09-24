import axios from "axios";

const networkError = {
  status: 0,
  message:
    "Network error, This could be a CORS issue or a Server timeout or a Dropped internet connection.",
};

const request = (options, save = {}) => {
  return new Promise((resolve, reject) => {
    axios(options)
      .then((response) => {
        resolve({
          isOk: true,
          status: response?.status || networkError.status,
          data: response?.data || networkError,
        });
      })
      .catch(({ response = {} }) => {
        resolve({
          isOk: false,
          status: response?.status || networkError.status,
          data: response?.data || networkError,
        });
      });
  });
};

export default request;

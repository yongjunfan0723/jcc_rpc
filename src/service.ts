const axios = require("axios");

export const service = axios.create({
  timeout: 30000
});
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

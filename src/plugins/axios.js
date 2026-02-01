import axios from "axios";
import router from "@/router";
import { domainService } from "@/services/domain-service";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

const getBaseUrl = () => {
  if (user?.email) {
    return domainService.getApiUrlForEmail(user.email);
  }

  return domainService.getApiUrl();
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

const onRequest = (config) => {
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }

  return config;
};

axiosInstance.interceptors.request.use(onRequest, null);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) return;
    switch (error.response.status) {
      case 403:
        router.push({
          name: "notfound",
          params: { code: 403 },
        });
        break;
      case 404:
        router.push({
          name: "notfound",
          params: { code: 404 },
        });
        break;
      default:
        console.log(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

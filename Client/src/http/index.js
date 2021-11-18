import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

$authHost.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const auth = token ? `Bearer ${token}` : "";
    config.headers.authorization = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export { $host, $authHost };

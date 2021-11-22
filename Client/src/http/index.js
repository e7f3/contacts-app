import axios from "axios";

/*  Конфигурация axios */

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

/*  Добавляет интерцептор для добавления в заголовки запроса jwt токена */
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

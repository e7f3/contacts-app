import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

/*  API для запросов, касающихся пользователя */

export const registration = async (userData) => {
  const {email, password, name} = userData
  const response = await $host.post("api/user/registration", {
    email,
    password,
    name,
  });
  localStorage.setItem("token", response.data.token);
  return jwt_decode(response.data.token);
};

export const login = async (userData) => {
  const {email, password} = userData;
  const response = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", response.data.token);
  return jwt_decode(response.data.token);
};

export const check = async () => {
  const response = await $authHost.get("api/user/auth");
  localStorage.setItem("token", response.data.token);
  return jwt_decode(response.data.token);
};

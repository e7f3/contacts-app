import React from "react";
import { useAsync } from "../hooks/useAsync";
import { check } from "../http/userAPI";
import { useStore } from "../hooks/useStore";
import Spinner from "./Spinner.jsx";

/*  Компонент - обёртка */
function Wrapper({ children }) {

  //  Организация запроса на проверку аутентификации пользователя
  const { status, value, error } = useAsync(check);

  // Получение из контекста глобального состояния пользователя
  const { userStore } = useStore();
  
  if (status === "success") {
    userStore.isAuth = true;
    userStore.user = value;
  } else if (status === "error") {
    userStore.isAuth = false;
  }
  return status === "pending" || status === "idle" ? (
    <Spinner />
  ) : (
    <div className="wrapper">{children}</div>
  );
}
export default Wrapper;

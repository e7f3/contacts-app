import React from "react";
import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes/routes";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";

/*  Компонент для работы с routes.
    Отрисовка путей в зависимости от данных об аутентификации пользователя  */
const AppRouter = observer(() => {
  
  // Получение из контекста глобального состояния пользователя
  const { userStore } = useStore();
  return (
    <Routes>
      {userStore.isAuth && addRoutes(privateRoutes)}
      {addRoutes(publicRoutes)}
    </Routes>
  );
})

function addRoutes(routes) {
  return routes.map(({ path, Element }) => (
    <Route key={path} path={path} element={<Element />} exact />
  ));
}

export default AppRouter;

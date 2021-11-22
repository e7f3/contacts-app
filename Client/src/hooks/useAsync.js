import { useState, useEffect, useCallback } from "react";

/*  Хук для организации работы с асинхронными функциями (запросами) */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  /*  Функция - обёртка для асинхронной функции.
      Устанавливает состояния статуса запроса, его результата и ошибки  */
  const execute = useCallback((...args) => {
    setStatus("pending");
    setValue(null);
    setError(null);

    return asyncFunction(...args)
      .then((response) => {
        setValue(response);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  // Выполнить запрос сразу, если не указано обратное
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
};

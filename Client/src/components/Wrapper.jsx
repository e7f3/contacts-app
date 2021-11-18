import React from "react";
import { useAsync } from "../hooks/useAsync";
import { check } from "../http/userAPI";
import { useStore } from "../hooks/useStore";
import Spinner from "./Spinner.jsx";

function Wrapper({ children }) {
  const { status, value, error } = useAsync(check);
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

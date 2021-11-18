import React from "react";
import AuthForm from "../components/AuthForm.jsx";
import { useLocation } from "react-router-dom";

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <div className="content content--auth">
      <div className="form-container">
        <h2 className="title title--h2">{isLogin ? "Sign In" : "Sign Up"}</h2>
        <AuthForm isLogin={isLogin} className="form"/>
      </div>
    </div>
  );
}

export default Auth;

import React, { useRef } from "react";
import Button from "./UI/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

/*  Компонент Header */
function Header() {

  //  Получение из контекста глобального состояния пользователя
  const { userStore } = useStore();
  const navigate = useNavigate();

  const handleClick = () => {
    userStore.signOut();
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="header">
      <HeaderLogo />
      <HeaderButtons isAuth={userStore.isAuth} onClick={handleClick} />
    </header>
  );
}

function HeaderLogo() {
  return (
    <div className="header__logo">
      <h3 className="title title--h3">
        <Link className="link header__logo-link" to="/">
          Contacts
        </Link>
      </h3>
    </div>
  );
}

function HeaderButtons({ isAuth, onClick }) {
  const buttonRef = useRef();
  const popupRef = useRef();
  const handleClick = () => {
    buttonRef.current.classList.toggle("active");
    popupRef.current.classList.toggle("show");
  };
  return (
    <>
      <Button
        className="button button--rectangle button--transparent header__menu-button"
        onClick={handleClick}
        ref={buttonRef}
      >
        <div />
      </Button>
      <div
        className="header__buttons-wrapper"
        onClick={handleClick}
        ref={popupRef}
      >
        <div className="header__buttons">
          {
            /*  Отрисовка кнопок в зависимости от аутентификации пользователя */
          }
          {isAuth ? (
            <>
              <Link className="link button button--transparent" to="/contacts">
                Contacts
              </Link>
              <Button
                className="button button--rectangle button--white"
                onClick={onClick}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link className="link button button--transparent" to="/login">
                Sign In
              </Link>
              <Link
                className="link button button--rectangle button--white"
                to="/registration"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;

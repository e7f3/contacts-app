import React from "react";
import CardIcon from "../images/contact_icon.svg";
import { Link } from "react-router-dom";
import ArrowIcon from "../images/arrow_icon.svg";

/*  Приветственная страница */

function Main() {
  return (
    <div className="main">
      <div className="content content--main">
        <MainInfo />
        <MainVisual />
      </div>
    </div>
  );
}

function MainInfo() {
  return (
    <div className="main__info">
      <div className="main__info-title">
        <h1 className="title title--h1">Manage your contacts</h1>
        <h1 className="title title--h1 title--gradient">Safe Easy Free.</h1>
      </div>
      <p className="text main__info-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ab
        maiores quaerat asperiores aliquam! Quas nobis vero obcaecati sint unde?
      </p>
      <Link
        className="link button button--rectangle main__info-button"
        to="/registration"
      >
        Create account
        <img src={ArrowIcon} />
      </Link>
    </div>
  );
}

function MainVisual() {
  return (
    <div className="main__visual">
      <img src={CardIcon} className="main__icon" />
      <div className="main__stat">
        <div className="main__stat-card">
          <span className="caption main__stat-info">Active Users</span>
          <span className="title title--h3 main__stat-info">99K</span>
        </div>
        <div className="main__stat-card">
          <span className="caption main__stat-info">Contacts</span>
          <span className="title title--h3 main__stat-info">999K</span>
        </div>
      </div>
    </div>
  );
}

export default Main;

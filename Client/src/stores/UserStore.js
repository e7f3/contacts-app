import { makeAutoObservable } from "mobx";

//  Глобальное состояние пользователя

export default class UserStore {
  _isAuth = false;
  _user = {};
  constructor() {
    makeAutoObservable(this);
  }
  set isAuth(value) {
    this._isAuth = value;
  }
  get isAuth() {
    return this._isAuth;
  }
  set user(value) {
    this._user = value;
  }
  get user() {
    return this._user;
  }
  signOut() {
    this.isAuth = false;
    this.user = {};
  }
}

import { Injectable } from '@angular/core';
import { ServiceLogin } from '../interface-api/interface-Login';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  isLogin2: ServiceLogin;
  constructor() { }

  getLogin(): ServiceLogin {
    const loginSuccess = localStorage.getItem('login');
    const json = JSON.parse(loginSuccess);
    return json;
  }

  setLogin(Token: ServiceLogin) {
    this.isLogin2 = Token;
    localStorage.setItem('login', JSON.stringify(this.isLogin2));
  }

  Token() {
    return this.getLogin();
  }

  accessToken(accessToken: string) {
    const data = this.getLogin();
    data.accessToken = accessToken;
    this.setLogin(data);
  }

  clearLogin() {
    this.isLogin2 = null;
    localStorage.clear();
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<any>;
  data;
  constructor(private srv: BaseService, public jwtHelper: JwtHelperService) {}

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();

    // const data = JSON.parse(localStorage.getItem('data'));
    // const expiry = data.tokenExpiresIn;
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  GetAll() {
    return this.srv.get('Appuser/all');
  }
  GetById(Id) {
    return this.srv.get('AppUser/' + Id);
  }
  Add(data) {
    return this.srv.post(data, 'AppUser');
  }
  ChangePassword(data) {
    return this.srv.post(data, 'AppUser/ChangePassword');
  }
  ForgetPassword(data) {
    return this.srv.post(data, 'AppUser/ChangePassword');
  }
  Update(data) {
    return this.srv.put(data, 'AppUser');
  }
  Delete(Id) {
    return this.srv.delete('AppUser/' + Id);
  }
  Login(data) {
    return this.srv.post(data, 'AppUser/login');
  }
}

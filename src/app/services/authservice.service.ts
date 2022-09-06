import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  data;
  constructor(public jwtHelper: JwtHelperService) {
    // this.data=JSON.parse(localStorage.getItem('data'))
    // this.currentUserSubject = new BehaviorSubject<any>(this.data.roleId);
    // this.currentUser = this.currentUserSubject.asObservable();
  }
  getToken() {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    console.log({ token });

    // const data = JSON.parse(localStorage.getItem('data'));
    // const expiry = data.tokenExpiresIn;
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }
}

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}
  base_url = environment.apiUrl;
  bearer_token;
  headers;
  userOtp(body) {
    const access_token = localStorage.getItem('token');
    ////console.log('token',access_token)
    this.bearer_token = 'Bearer ' + access_token;
    this.headers = {
      'Content-Type': 'application/json',
      authorization: this.bearer_token,
    };
    return this.http.put(
      `${this.base_url}/api/ClientCom/UpdateMobileNo`,
      body,
      { headers: this.headers }
    );
  }
  enterOtp(body) {
    const access_token = localStorage.getItem('token');
    this.bearer_token = 'Bearer ' + access_token;
    this.headers = {
      'Content-Type': 'application/json',
      authorization: this.bearer_token,
    };
    return this.http.put(
      `${this.base_url}/api/ClientCom/OTPVerification`,
      body,
      { headers: this.headers }
    );
  }
}

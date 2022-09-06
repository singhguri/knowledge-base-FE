import { Observable } from 'rxjs';
import {
  CommonApiResponse,
  LoginUserDetails,
} from './../_models/interfaces/commonResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  base_url = environment.apiUrl;
  loginUser(body): Observable<CommonApiResponse<LoginUserDetails>> {
    return this.http.post<CommonApiResponse<LoginUserDetails>>(
      `${this.base_url}/api/auth/login`,
      body
    );
  }
  sendOTp(mobileNumber) {
    return this.http.put(
      `${this.base_url}/api/ClientCom/SendPasswordResetOTP`,
      mobileNumber
    );
  }
  verifyOtp(body) {
    return this.http.put(
      `${this.base_url}/api/ClientCom/VerifyPasswordResetOTP`,
      body
    );
  }
  resetPassword(body) {
    return this.http.put(`${this.base_url}/api/ClientCom/ResetPassword`, body);
  }
}

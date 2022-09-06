import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}
  base_url = environment.apiUrl;

  registerUser(body) {
    return this.http.post(`${this.base_url}/api/auth/register`, body);
  }
}

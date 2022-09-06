import { MasterService } from './master';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BaseService {
  public BaseURL: string;
  Token: string = '';
  constructor(private http: HttpClient, public master: MasterService) {
    this.BaseURL = environment.apiUrl;
    // if (!window.origin.startsWith("http://localhost"))
    // this.BaseURL = window.origin.replace("www", "api") + "/";
  }

  open(url = '') {
    return this.http.get<any>(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  get(url = '') {
    return this.http.get<any>(this.BaseURL + url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  delete(url = '') {
    return this.http.delete(this.BaseURL + url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  post(data, url = '') {
    return this.http.post<any>(this.BaseURL + url, data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  put(data, url = '') {
    console.log(this.BaseURL + url, data);

    return this.http.put(this.BaseURL + url, data).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}

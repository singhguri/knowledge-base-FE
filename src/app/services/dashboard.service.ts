import {
  CommonApiResponse,
  ZoneChart,
} from './../_models/interfaces/commonResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  base_url = environment.apiUrl;
  constructor(private http: HttpClient) {}
}

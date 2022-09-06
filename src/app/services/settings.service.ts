import { BaseService } from './base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private srv: BaseService) {}
  GetAll() {
    return this.srv.get('Settings/all');
  }
  GetById(Id) {
    return this.srv.get('Settings/' + Id);
  }
  GetByName(name) {
    return this.srv.get('Settings/' + name);
  }
}

import { BaseService } from './base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KBHeadingService {
  constructor(private srv: BaseService) {}

  GetAll() {
    return this.srv.get('KBHeadings/all');
  }
  GetById(Id) {
    return this.srv.get('KBHeadings/' + Id);
  }
  Add(data) {
    return this.srv.post(data, 'KBHeading');
  }
  GetContentByKBHeading(id) {
    return this.srv.get('KBHeadings/GetContentByKBHeading/' + id);
  }
}

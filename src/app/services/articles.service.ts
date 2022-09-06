import { BaseService } from './base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private srv: BaseService) {}

  GetAll() {
    return this.srv.get('Articles/all');
  }
  GetById(Id) {
    return this.srv.get('Articles/' + Id);
  }
  Add(data) {
    return this.srv.post(data, 'Articles');
  }
  UpdateVisitCount(id) {
    return this.srv.get(`Articles/UpdateVisitCount/${id}`);
  }
  WasHelpful(id) {
    return this.srv.get(`Articles/WasHelpful/${id}`);
  }
}

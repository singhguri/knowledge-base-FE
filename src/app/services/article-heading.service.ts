import { BaseService } from './base';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleHeadingService {
  constructor(private srv: BaseService) {}
  GetAll() {
    return this.srv.get('ArticleHeading/all');
  }
  GetById(Id) {
    return this.srv.get('ArticleHeading/' + Id);
  }
  Add(data) {
    return this.srv.post(data, 'ArticleHeading');
  }
  GetContentByArticleHeading(id) {
    return this.srv.get('ArticleHeadings/GetContentByArticleHeading/' + id);
  }
}

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { GlobalsX } from 'src/app/services/globals';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css'],
})
export class ListArticlesComponent implements OnInit {
  articlesList: any;

  isSelectedAll: boolean = false;
  selectedOn: boolean;
  toggleStatus: boolean;
  subscribe: Subscription[] = [];

  constructor(
    private srv: ArticlesService,
    private gl: GlobalsX,
    private router: Router
  ) {
    gl.addArticle = false;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.subscribe.push(
      this.srv.GetAll().subscribe((m) => {
        if (m.respStatus) {
          let articlesList = m.lstModel;
          articlesList.forEach((item, index) => {
            item.updatedDate =
              new Date(item.updatedDate).toLocaleDateString() +
              ' at ' +
              new Date(item.updatedDate).toLocaleTimeString();
          });
          this.articlesList = articlesList;
          console.log(this.articlesList);
        }
      })
    );
  }

  toggleAll() {
    this.toggleStatus = !this.isSelectedAll;
    if (this.articlesList.length > 0) {
      this.articlesList.forEach((article) => {
        article.selected = this.toggleStatus;
      });
    }
    this.isSelectedAll = this.articlesList.every(
      (article) => article.selected === true
    );

    this.selectedOn = this.articlesList.every(
      (article) => article.selected === false
    );
  }

  toggleOne(event, order) {
    this.selectedOn = !event;
    this.checkForSelection();

    this.isSelectedAll = this.articlesList.every(
      (article) => article.selected === true
    );
  }

  checkForSelection() {
    this.selectedOn = this.articlesList.every(
      (article) => article.selected === false
    );
  }

  editArticle(article) {
    this.gl.article = article;
    this.router.navigate(['/articles/add-article']);
  }

  ngOnDestroy() {
    this.subscribe.forEach((el) => el.unsubscribe());
  }
}

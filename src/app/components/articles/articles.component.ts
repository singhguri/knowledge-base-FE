import { Router } from '@angular/router';
import { GlobalsX } from './../../services/globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  constructor(public gl: GlobalsX, private router: Router) {}

  ngOnInit(): void {}

  addArticle() {
    this.gl.article = null;
    this.router.navigate(['/articles/add-article']);
  }
}

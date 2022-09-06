import { ArticlesService } from './../../services/articles.service';
import { MasterService } from './../../services/master';
import { Router } from '@angular/router';
import { GlobalsX } from './../../services/globals';
import { KBHeadingService } from './../../services/kbheading.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  allContent: any;
  showSolution: boolean = false;
  topArticleLst: any[] = [];
  selectedArticle: any;
  contentHtml: ElementRef;

  constructor(
    private kbSrv: KBHeadingService,
    public gl: GlobalsX,
    private router: Router,
    private master: MasterService,
    private artSrv: ArticlesService,
    private el: ElementRef,
    private loaderSrv: LoaderService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.gl.showSolution = false;
    // this.kbSrv.GetContentByKBHeading(0).subscribe((m) => {
    //   if (m.respStatus) {
    //     this.allContent = m.lstModel;
    //     console.log(this.allContent);
    //   }
    // });

    this.getAllTopArticles();
  }

  GetSolutionByKbHeadingId(id) {
    // console.log({ id });
    this.gl.showSolution = true;
    this.gl.kbHeadingId = id;
    this.router.navigateByUrl('support/kbHeading');
  }

  GetSolutionByArticleHeadingId(id) {
    // console.log({ id });
    this.gl.showSolution = true;
    this.gl.headingId = id;
    this.router.navigateByUrl('support/heading');
  }

  GetSolutionByArticleId(id) {
    // console.log({ id });
    this.gl.showSolution = true;
    this.gl.articleId = id;
    this.router.navigateByUrl('support/article');
  }

  getAllTopArticles() {
    this.loaderSrv.show();

    this.artSrv.GetAll().subscribe((m) => {
      this.loaderSrv.hide();
      if (m.respStatus) {
        if (m.lstModel != null && m.lstModel.length > 0) {
          let articles = m.lstModel;
          articles.forEach((item, index) => {
            if (index > 0) item['selected'] = false;
            else item['selected'] = true;
          });
          this.topArticleLst = articles;
          console.log(this.topArticleLst);
          this.changeSelection();
        }
      }
    });
  }

  changeSelection(id = 0) {
    if (id > 0) {
      this.topArticleLst.forEach((item) => {
        if (item.id == id) item['selected'] = true;
        else item['selected'] = false;
      });
      this.selectedArticle = this.topArticleLst.filter((x) => x.id == id)[0];
    } else {
      this.topArticleLst.forEach((item, index) => {
        if (index == 0) item['selected'] = true;
        else item['selected'] = false;
      });

      this.selectedArticle = this.topArticleLst[0];
    }

    if (this.selectedArticle) {
      const contentHTML: HTMLElement =
        this.el.nativeElement.querySelector('#content');

      if (contentHTML) contentHTML.innerHTML = this.selectedArticle.content;
    }

    console.log(this.selectedArticle);
  }

  showArticle() {
    this.gl.article = this.selectedArticle;
    this.router.navigateByUrl('/support/article');
  }
}

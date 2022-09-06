import { ArticleHeadingService } from './../../../services/article-heading.service';
import { GlobalsX } from './../../../services/globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css'],
})
export class HeadingComponent implements OnInit {
  headingId: number;
  headingModel: any[] = [];

  constructor(public gl: GlobalsX, private srv: ArticleHeadingService) {
    this.headingId = this.gl.headingId;
  }

  ngOnInit(): void {
    this.gl.showSolution = true;
    // console.log(this.gl.showSolution);
    this.refresh();
  }

  refresh() {
    if (this.headingId > 0)
      this.srv.GetContentByArticleHeading(this.gl.headingId).subscribe((m) => {
        if (m.respStatus) {
          console.log(m.lstModel);
          this.headingModel = m.lstModel;
        }
      });
  }
}

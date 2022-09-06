import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from 'src/app/services/master';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalsX } from './../../../services/globals';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      // ['bold']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    public gl: GlobalsX,
    private router: Router,
    private srv: ArticlesService,
    private toastr: ToastrService,
    private master: MasterService,
    private modal: NgbModal
  ) {
    gl.addArticle = true;
  }

  ngOnInit(): void {}

  AddArticle = new FormGroup({
    // aart
  });

  submit() {}

  cancel() {}
}

import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit {
  constructor() {}

  RelatedSearchForm = new FormGroup({
    supportSearch: new FormControl(''),
  });

  ngOnInit(): void {}

  SearchArticle() {
    console.log(this.RelatedSearchForm.value);
  }
}

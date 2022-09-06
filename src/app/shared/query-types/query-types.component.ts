import { Component, OnInit } from '@angular/core';
import { types } from '../query-types/query-type-items';

@Component({
  selector: 'app-query-types',
  templateUrl: './query-types.component.html',
  styleUrls: ['./query-types.component.css'],
})
export class QueryTypesComponent implements OnInit {
  queryTypes: any[] = types;

  constructor() {}

  ngOnInit(): void {}

  changeQueryTab(typeId: number) {
    this.queryTypes.forEach((item) => {
      if (item.typeId === typeId) item.isActive = true;
      else item.isActive = false;
    });

    // console.log(this.queryTypes);
  }
}

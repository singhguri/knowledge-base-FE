import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-waybill',
  templateUrl: './search-waybill.component.html',
  styleUrls: ['./search-waybill.component.css'],
})
export class SearchWaybillComponent implements OnInit {
  constructor() {}

  SearchWayBillForm = new FormGroup({
    WayBillNo: new FormControl(''),
  });

  ngOnInit(): void {}

  SearchWaybill() {
    console.log(this.SearchWayBillForm.value);
  }
}
